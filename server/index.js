import { GoogleGenerativeAI } from "@google/generative-ai"
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const dotenv = require('dotenv')
const axios = require('axios')
const openai = require('openai')

const genai = require('@google/generative-ai')

dotenv.config()

const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "root",
	database: "virtual_shop"
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json()) //allow grabbing json from frontend
app.use(cors()) //for No 'Access-Control-Allow-Origin errors

// CATEGORY
app.post('/api/insert-category', (req, res) => {
	const name = req.body.name
	const description = req.body.description
	const slug = req.body.slug
	const category = req.body.category

	const sql = "insert into category(name, description, slug, parent_id) values(?, ?, ?, ?);"
	db.query(sql, [name, description, slug, category], (err, result) => {
		res.send({insertId: result.insertId})
	})
})

app.get('/api/delete-category', (req, res) => {
	const id = req.query.id

	const sql = "delete from category where id =?;"
	db.query(sql, id, (err, result) => {
		res.send(result)
	})
})

app.get('/api/get-category', (req, res) => {
	let where = req.query.id == null ? 'slug=?;' : 'id=?;'
	
	let category = typeof  req.query.id !== "undefined" ? req.query.id : req.query.slug

	const sql = "select * from category where " + where
	db.query(sql, category, (err, result) => {
		res.send(result)
	})
})

app.get('/api/delete-category-image', (req, res) => {
	let id = req.query.id

	const rootDir = '../client/public/uploads/category/'
	let dir = rootDir + id

	fs.rmSync(dir, { recursive: true, force: true });
	
	const sql = "update category set image_name='', image_url='' where id=?"
	db.query(sql, id, (err, result) => {
		res.send(result)
	})
})

app.post('/api/update-category', (req, res) => {
	const id = req.body.id
	const name = req.body.name
	const description = req.body.description
	const slug = req.body.slug
	const parent_id = req.body.category

	const sql = "update category set name =?, description =?, slug=?, parent_id=? where id =?;"
	db.query(sql, [name, description, slug, parent_id, id], (err, result) => {
		res.send(result)
	})
})

app.get('/api/get-categories', (req, res) => {
	const parentId = req.query.parentId ? req.query.parentId : 0
	
	let where = ''

	switch(req.query.type) {
		case 'all':
			break;
		case 'parents':
			where = 'where parent_id = 0;'
			break;
		case 'children':
			where = 'where parent_id > 0;'
		default:
			where = parentId > 0 ? 'where parent_id =?;' : ''

	}

	const sql = "select * from category " + where
	db.query(sql, parentId,(err, result) => {
		//console.log(where)
		res.send(result)
	})
})

// BRAND
app.get('/api/get-brands', (req, res) => {
	const sql = "select * from brand;"

	db.query(sql, (err, result) => {
		res.send(result)
	})
})

app.get('/api/get-brand', (req, res) => {
	const id = req.query.id

	const sql = "select * from brand where id=?;"
	db.query(sql, id, (err, result) => {
		
		res.send(result)
	})
})

app.post('/api/insert-brand', (req, res) => {
	const name = req.body.name
	const description = req.body.description

	const sql = "insert into brand (name, description) values(?, ?);"
	db.query(sql, [name, description], (err, result) => {
		res.send(result)
	})
})

app.post('/api/update-brand', (req, res) => {
	const id = req.body.id
	const name = req.body.name
	const description = req.body.description

	const sql = "update brand set name=?, description=? where id=?;"
	db.query(sql, [name, description, id], (err, result) => {
		res.send(result)
	})
})

app.get('/api/delete-brand', (req, res) => {
	const id = req.query.id

	const sql = "delete from brand where id=?;"
	db.query(sql, id, (err, result) => {
		res.send(result)
	})
})

app.get('/api/delete-brand-image', (req, res) => {
	const id = req.query.id

	const rootDir = '../client/public/uploads/brand/'
	let dir = rootDir + id

	fs.rmSync(dir, { recursive: true, force: true });

	const sql = "update brand set image_name='', image_url='' where id=?;"
	db.query(sql, id, (err, result) => {
		res.send(result)
	})
})

// PRODUCT
app.post('/api/insert-product', (req, res) => {
	const name = req.body.name
	const categoryId = req.body.category

	const sql = "insert into product(category_id, name) values(?, ?);"
	db.query(sql, [categoryId, name], (err, result) => {
		console.log(err)
	})
})

app.get('/api/get-products', (req, res) => {
	const categoryId = req.query.categoryId

//(select product_id from pi where pi.product_id=p.id and pi.thumb=1)
	const sql = `select p.*, pi.image_name as thumb
		from product as p 
		left join product_image as pi 
		on pi.product_id=p.id
		and pi.thumb=1
		where p.category_id=? 
		group by pi.id, p.id;`
	db.query(sql, categoryId, (err, result) => {
		console.log(err)
		res.send(result)
	})
})

app.get('/api/get-product', (req, res) => {
	let product = req.query.slug !== null ? req.query.slug : req.query.id
	let where = req.query.slug !== null ? 'slug=?;' : 'id=?;'
// join with attributes, options and images
	const sql = "select * from product where " + where
	db.query(sql, product, (err, result) => {
		res.send(result)
	})
})

app.get('/api/get-product-all', (req, res) => {
	let product = req.query.slug ? req.query.slug : req.query.id
	let where = req.query.slug ? 'p.slug=?' : 'p.id=?'
	
	// join with attributes, options and images
	const sql = `select p.*, b.name as brand, GROUP_CONCAT(
					DISTINCT CONCAT(pa.id, ',', pa.name, ',', pa.value)
					ORDER BY pa.product_id
					separator ';'
				) attributes,
				GROUP_CONCAT(
					DISTINCT CONCAT(pi.image_name)
					ORDER BY pi.product_id
					separator ';'
				) images,
				GROUP_CONCAT(
					DISTINCT CONCAT(o.name, ',', o.description)
					ORDER BY o.id
					separator ';'
				) options,
				GROUP_CONCAT(
					DISTINCT CONCAT(pr.name, ',', pr.value, ',', pr.type, ',', pr.description)
					ORDER BY pr.id
					separator ';'
				) promotions,
				avg(rating) rating
				from product p
				left join product_attribute pa on p.id=pa.product_id
				left join brand b on b.id=p.id
				left join product_image pi on p.id=pi.product_id
				left join product_promotion pp on p.id=pp.product_id
				left join promotion pr on pp.promotion_id=pr.id 
				left join product_option po on p.id=po.product_id
				left join \`option\` o on po.option_id=o.id
				left join review r on p.id=r.product_id
				where ` + where + `
				group by p.id`

	db.query(sql, product, (err, result) => {
		res.send(result)
	})
})

app.post('/api/edit-product', (req, res) => {
	const id = req.body.id
	const name = req.body.name
	const description = req.body.description
	const categoryId = req.body.category
	const price = req.body.price
	const newPrice = req.body.newPrice
	const brandId = req.body.brand
	const qty = req.body.qty

	const sql = "update product set name=?, category_id=?, description=?, price=?, new_price=?, qty=?, brand_id=? where id=?);"
	db.query(sql, [name, categoryId, description, price, newPrice, qty, brandId, id], (err, result) => {
		console.log(err)
	})
})

app.post('/api/delete-product', (req, res) => {
	const id = req.body.id

	const sql = "delete from products where id = ?;"
	db.query(sql, id, (err, result) => {
		console.log(err)
	})
})

// REVIEW
app.post('/api/insert-review', (req, res) => {
	const userId = 1
	const productId = req.body.productId
	const title = req.body.title
	const description = req.body.description
	const rating = req.body.rating
	const date = req.body.date
	
	const sql = "insert into review(user_id, product_id, title, description, rating) values(?, ?, ?, ?, ?, ?);"
	db.query(sql, [userId, productId, title, description, rating, date], (err, result) => {
		console.log(err)
		res.send(result)
	})
})

app.get('/api/get-reviews', (req, res) => {
	const productId = req.query.productId

	const sql = "select * from review where product_id=? order by date desc;"
	db.query(sql, productId, (err, result) => {
		console.log(productId)
		res.send(result)
	})
})

app.get('/api/delete-review', (req, res) => {
	const id = req.query.id

	const sql = "delete from review where id=?;"
	db.query(sql, id, (err, result) => {
		console.log(err)
		res.send(result)
	})
})

//PRODUCT OPTION
app.get('/api/get-product-options', (req, res) => {
	const productId = req.query.productId

	const sql = "select * from product_option where product_id=?;"
	db.query(sql, productId, (err, result) => {
		res.send(result)
	})
})

app.get('/api/get-options', (req, res) => {

	const sql = "select * from `option`;"
	db.query(sql, (err, result) => {
		console.log(err)
		res.send(result)
	})
})

app.get('/api/get-option', (req, res) => {
	const id = req.query.id

	const sql = "select * from `option` where id=?;"
	db.query(sql, id, (err, result) => {
		res.send(result)
	})
})

app.get('/api/delete-option', (req, res) => {
	const id = req.query.id

	const sql = "delete from `option` where id=?;"
	db.query(sql, id, (err, result) => {
		res.send(result)
	})
})

app.post('/api/insert-option', (req, res) => {
	const name = req.body.name
	const description = req.body.description

	const sql = "insert into `option`(name, description) values(?, ?);"
	db.query(sql, [name, description], (err, result) => {
		res.send(result)
	})
})

app.post('/api/update-option', (req, res) => {
	const id = req.body.id
	const name = req.body.name
	const description = req.body.description

	const sql = "update `option` set name=?, description=? where id=?;"
	db.query(sql, [name, description, id], (err, result) => {
		res.send(result)
	})
})

app.post('/api/insert-product-option', (req, res) => {
	const productId = req.body.productId
	const optionId = req.body.optionId

	const sql = "insert into product_option(product_id, option_id) values(?, ?);"
	db.query(sql, [productId, optionId], (err, result) => {
		console.log(err)
		res.send(result)
	})
})

app.post('/api/delete-product-option', (req, res) => {
	const productId = req.body.productId
	const optionId = req.body.optionId

	const sql = "delete from product_option where product_id=? and option_id=?;"
	db.query(sql, [productId, optionId], (err, result) => {
		res.send(result)
	})
})


// PRODUCT ATTRIBUTES
app.get('/api/get-product-attributes', (req, res) => {
	const id = req.query.productId

	const sql = "select * from `product_attribute` where product_id=?;"
	db.query(sql, id, (err, result) => {
		res.send(result)
	})
})

app.post('/api/insert-product-attribute', (req, res) => {
	const productId = req.body.productId
	const attributeName = req.body.attributeName
	const attributeValue = req.body.attributeValue

	const sql = "insert into product_attribute(product_id, name, value) values(?, ?, ?);"
	db.query(sql, [productId, attributeName, attributeValue], (err, result) => {
		res.send(result)
	})
})

app.get('/api/delete-product-attribute', (req, res) => {
	const id = req.query.id

	const sql = "delete from product_attribute where id=?;"
	db.query(sql, id, (err, result) => {
		res.send(result)
	})
})

// PRODUCT IMAGES
app.get('/api/get-product-images', (req, res) => {
	const id = req.query.productId

	const sql = "select * from `product_image` where product_id=?;"
	db.query(sql, id, (err, result) => {
		console.log(err)
		res.send(result)
	})
})

app.get('/api/delete-product-image', (req, res) => {
	const imageUrl = req.query.imageUrl

	fs.unlinkSync(imageUrl); //full path

	const sql = "delete from product_image where image_url=?;"
	db.query(sql, imageUrl, (err, result) => {
		res.send(result)
	})
})

app.get('/api/set-thumb-image', (req, res) => {
	const imageUrl = req.query.imageUrl
	const thumb = req.query.thumb == 'true' ? 1 : 0

	let sql = ''

	if(thumb === 1) {
		sql = "update product_image set thumb=0 where thumb=1;"
		db.query(sql)
	}

	sql = "update product_image set thumb=? where image_url=?;"
	db.query(sql, [thumb, imageUrl], (err, result) => {
		console.log(thumb)
		res.send(result)
	})
})


// VOUCHER
app.get('/api/get-vouchers', (req, res) => {
	const sql = "select * from voucher;"
	db.query(sql, (err, result) => {
		res.send(result)
	})
})

app.get('/api/get-voucher', (req, res) => {
	const id = req.query.id

	const sql = "select * from voucher where id=?;"
	db.query(sql, id, (err, result) => {
		res.send(result)
	})
})

app.post('/api/insert-voucher', (req, res) => {
	const name = req.body.name
	const description = req.body.description
	const type = req.body.type
	const num = req.body.num
	const date = req.body.date
	const value = req.body.value
	const code = req.body.code

	const sql = "insert into voucher(name, description, type, value, date, num, code) values(?, ?, ?, ?, ?, ?, ?);"
	db.query(sql, [name, description, type, value, date, num, code], (err, result) => {
		res.send(result)
	})
})

app.post('/api/update-voucher', (req, res) => {
	const id = req.body.id
	const name = req.body.name
	const description = req.body.description
	const type = req.body.type
	const num = req.body.num
	const value = req.body.value
	const date = req.body.date
	const code = req.body.code

	const sql = "update voucher set name=?, description=?, type=?, value=?, date=?, num=?, code=? where id=?;"
	db.query(sql, [name, description, type, value, date, num, code, id], (err, result) => {
		res.send(result)
	})
})

app.get('/api/delete-voucher', (req, res) => {
	const id = req.query.id

	const sql = "delete from voucher where id=?;"
	db.query(sql, id, (err, result) => {
		res.send(result)
	})
})

app.post('/api/insert-product-voucher', (req, res) => {
	const productId = req.body.productId
	const voucherId = req.body.voucherId

	const sql = "insert into product_voucher(product_id, voucher_id) values(?, ?);"
	db.query(sql, [productId, voucherId], (err, result) => {
		res.send(result)
	})
})

app.post('/api/delete-product-voucher', (req, res) => {
	const voucherId = req.body.voucherId
	const productId = req.body.productId

	const sql = "delete from product_voucher where product_id=? and voucher_id=?;"
	db.query(sql, [productId, voucherId], (err, result) => {
		res.send(result)
	})
})

// PROMOTION

app.get('/api/get-product-promotions', (req, res) => {
	const sql = "select * from promotion;"
	db.query(sql, (err, result) => {
		res.send(result)
	})
})

app.get('/api/get-promotions', (req, res) => {
	const sql = "select * from promotion;"
	db.query(sql, (err, result) => {
		res.send(result)
	})
})

app.get('/api/get-promotion', (req, res) => {
	const id = req.query.id

	const sql = "select * from promotion where id=?;"
	db.query(sql, id, (err, result) => {
		res.send(result)
	})
})

app.post('/api/insert-promotion', (req, res) => {
	const name = req.body.name
	const description = req.body.description
	const type = req.body.type
	const value = req.body.value
	const startDate = req.body.startDate
	const endDate = req.body.endDate
	const home = req.body.home

	const sql = "insert into promotion(name, description, type, value, start_date, end_date, home) values(?, ?, ?, ?, ?, ?, ?);"
	db.query(sql, [name, description, type, value, startDate, endDate, home], (err, result) => {
		res.send(result)
	})
})

app.post('/api/update-promotion', (req, res) => {
	const id = req.body.id
	const name = req.body.name
	const description = req.body.description
	const type = req.body.type
	const value = req.body.value
	const startDate = req.body.startDate
	const endDate = req.body.endDate
	const home = req.body.home

	const sql = "update promotion set name=?, description=?, type=?, value=?, start_date=?, end_date=?, home=? where id=?;"
	db.query(sql, [name, description, type, value, startDate, endDate, home, id], (err, result) => {
		res.send(result)
	})
})

app.get('/api/delete-promotion-image', (req, res) => {
	const id = req.query.id

	const rootDir = '../client/public/uploads/promotion/'
	let dir = rootDir + id

	fs.rmSync(dir, { recursive: true, force: true });

	const sql = "update promotion set image_name='', image_url='' where id=?;"
	db.query(sql, id, (err, result) => {
		res.send(result)
	})
})

app.get('/api/delete-promotion', (req, res) => {
	const id = req.query.id

	const sql = "delete from promotion where id=?;"
	db.query(sql, id, (err, result) => {
		res.send(result)
	})
})

app.post('/api/insert-product-promotion', (req, res) => {
	const productId = req.body.productId
	const promotionId = req.body.promotionId

	const sql = "insert into product_promotion(product_id, promotion_id) values(?, ?);"
	db.query(sql, [productId, promotionId], (err, result) => {
		res.send(result)
	})
})

app.post('/api/delete-product-promotion', (req, res) => {
	const productId = req.body.productId
	const promotionId = req.body.promotionId

	const sql = "delete from product_promotion where product_id=? and promotion_id=?;"
	db.query(sql, [productId, promotionId], (err, result) => {
		res.send(result)
	})
})


// ORDER

app.get('/api/get-orders', (req, res) => {
	const id = req.query.id
	const where = id ? ' where o.id=?' : ''

	const sql = `
		SELECT 
			o.*, 
			bi.*,
			si.*,
			CONCAT(u.first_name, ' ', u.last_name) as username,   
			u.email as email,
			DATE_FORMAT(o.created_at, '%d-%m-%Y') AS order_date
		FROM \`order\` o
		LEFT JOIN \`user\` u ON u.id=o.user_id
		LEFT JOIN billing_information bi ON bi.id=o.billing_id
		LEFT JOIN shipping_information si ON si.id=o.shipping_id
		`+ where +`
		;`
	db.query(sql, [id], (err, result) => {
		res.send(result)
	})
})

// MENU
app.get('/api/get-menu', (req, res) => {
	const sql = "SELECT c1.id as subcategory_id, c1.name as subcategory_name, c2.id, c2.name as category_name, c1.category_id FROM category c2 LEFT JOIN subcategory c1 ON c2.id = c1.category_id;"
	db.query(sql, (err, result) => {
		
		let resultArr = {};
		for (var i = 0; i < result.length; i++) {
			if(resultArr[result[i].category_name] === undefined) {
				resultArr[result[i].category_name] = []
			} 

		    resultArr[result[i].category_name].push({
		    	'category_name': result[i].category_name,
		    	'subcategory_name': result[i].subcategory_name,
		    	'category_id': result[i].category_id,
		    	'id': result[i].id
		    })
		}
		console.log(resultArr)
		res.send(resultArr)
	})
})

// FILE UPLOAD

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  	const rootDir = '../client/public/uploads/'
  	const id = req.body.id
  	var typeDir = req.body.type + '/'

  	if (!fs.existsSync(rootDir + typeDir)){
	    fs.mkdirSync(rootDir + typeDir);
	}

	var dir = rootDir + typeDir + id + '/'

	if (!fs.existsSync(dir)){
	    fs.mkdirSync(dir);
	}

    cb(null, path.join(__dirname, dir))
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0],
    )
  },
})

const multi_upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/jpg'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      const err = new Error('Only .jpg .jpeg .png images are supported!')
      err.name = 'ExtensionError'
      return cb(err)
    }
  },
}).array('uploadImages', 10)

app.post('/api/upload', (req, res) => {
    multi_upload(req, res, function (err) {
      	console.log(req.files)
	    //multer error
		if (err instanceof multer.MulterError) {
	      console.log(err)
	      res
	        .status(500)
	        .send({
	          error: { msg: `multer uploading error: ${err.message}` },
	        })
	        .end()
	      return
	    } else if (err) {
	      //unknown error
	      if (err.name == 'ExtensionError') {
	        res
	          .status(413)
	          .send({ error: { msg: `${err.message}` } })
	          .end()
	      } else {
	        res
	          .status(500)
	          .send({ error: { msg: `unknown uploading error: ${err.message}` } })
	          .end()
	      }
	      return
	    }

	    let productImages = []
	    let returnImages = []

	    const type = req.body.type
	    let id = req.body.id
	   
	    let sql = ''
	    let params = ''
	    switch(type) {
	    	case 'product':
		    	req.files.forEach((file) => {
			    	productImages.push([id, file.filename, file.path, 0])

			    	returnImages.push({
			    		//id: id, 
			    		product_id: id, 
			    		file_name: req.files[0].filename, 
			    		file_path: req.files[0].path, 
			    		thumb: '0'
			    	})
			    })

			    sql = 'insert into product_image(product_id, image_name, image_url, thumb) values ?'
			    params = [productImages]
			    break
			default:
	    		sql = 'update ' + type + ' set image_name=?, image_url=? where id=?'
	    		params = [req.files[0].filename, req.files[0].path, id]
	    }

	    db.query(sql, params, (err, result) => {

	    	result.returnImages = returnImages
	    	result.filename = req.files[0].filename
			res.status(200).send(result)
		})
	})
})

// AI QUERIES
const gemini_api_key = process.env.GEMINI_API_KEY
const googleAI = new GoogleGenerativeAI(gemini_api_key)

const geminiConfig = {
	  temperature: 0.9,
	  topP: 1,
	  topK: 1,
	  maxOutputTokens: 4096,
	};

const geminiModel = googleAI.getGenerativeModel({
		  model: "gemini-1.5-pro",
		  geminiConfig,
	});

const generate = async (prompt) => {
  try {
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    console.log(response.text())
    return response.text()
  } catch (error) {
    console.log("response error", error);
  }
};

app.post('/api/generate-description', async (req, res) => {
	const title = req.body.title
	const brand = req.body.brand
	const prompt = `generate a 30 line promotional description for the 
					product ` + brand + ` ` + title + `, using long phrases and paragraphs. 
					Replace newline character with <br>`

	const result = await generate(prompt)
	console.log(result)
	res.send(result)
})

app.post('/api/generate-attributes', async (req, res) => {
	const title = 'taco'//req.body.title
	const brand = ''//req.body.brand
	const prompt = `generate a list of attributes for the product ` + brand + ` ` + title + `. 
					Return it in json format, on one level of depth. 
					`

	const result = await generate(prompt)
	console.log(result)
	res.send(result)
})


 //////////////////

app.listen(3001, () => {
	console.log('run')
})