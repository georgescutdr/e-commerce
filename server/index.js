import { GoogleGenerativeAI } from "@google/generative-ai"
import { createRequire } from 'module'
import { fileURLToPath } from 'url';
import path2 from 'path'

// __dirname equivalent in ES modules
const __dirname = path2.dirname(fileURLToPath(import.meta.url));

const require = createRequire(import.meta.url)
const express = require('express')
const multer = require('multer')
const mysql = require('mysql2/promise')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')
const axios = require('axios')
const openai = require('openai')
const xlsx = require('xlsx')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

// Initialize environment variables
dotenv.config()

const app = express()

const genai = require('@google/generative-ai')

const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "root",
	database: "virtual_shop"
})

// Middleware
app.use(express.json()) // to parse JSON body
app.use(express.urlencoded({ extended: true })) // to parse form data
app.use(cors())

// Function to handle image uploads dynamically
const handleImageUpload = (fieldName, multiple = false) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const { itemType, id } = req.body

            if (!itemType) {
                return cb(new Error("Item type is required."), false)
            }

            let uploadPath = path.join(__dirname, 'uploads', itemType)

            if (id) {
                uploadPath = path.join(uploadPath, id.toString())
            } else {
                uploadPath = path.join(uploadPath, 'new-item')
            }

            fs.mkdirSync(uploadPath, { recursive: true })
            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })

    return multiple ? multer({ storage }).array(fieldName, 10) : multer({ storage }).single(fieldName)
}

// Function to remove "new-item" folder after successful upload
const cleanNewItemFolder = (itemType) => {
    const tempFolder = path.join(__dirname, 'uploads', itemType, 'new-item')
    fs.rm(tempFolder, { recursive: true, force: true }, (err) => {
        if (err) console.error("Error deleting temporary folder:", err)
    })
}

//MULTIPLE IMAGES UPLOAD
// Insert ITEM Route (Multiple Images Upload)
app.post('/api/insert-ITEM', handleImageUpload('images', true), (req, res) => {
    const { name, description, price, itemType } = req.body;
    const images = req.files ? req.files.map(file => file.filename) : [];

    const sql = "INSERT INTO product (name, description, price, images) VALUES (?, ?, ?, ?);";
    const values = [name, description, price, JSON.stringify(images)];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).send({ message: "Error inserting product", error: err });

        const itemId = result.insertId;

        if (images.length > 0) {
            const oldPath = path.join(__dirname, 'uploads', itemType, 'new-item');
            const newPath = path.join(__dirname, 'uploads', itemType, itemId.toString());

            fs.rename(oldPath, newPath, (err) => {
                if (err) return res.status(500).send({ message: "Error renaming image folder" });

                cleanNewItemFolder(itemType);
                res.send({ message: "Product inserted successfully!", itemId });
            });
        } else {
            res.send({ message: "Product inserted successfully without images.", itemId });
        }
    });
});

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

app.get('/api/get-option', (req, res) => {
	const id = req.query.id

	const where = id ? ' where id=?' : ';'

	const sql = "select * from `option`" + where
 	db.query(sql, [id], (err, result) => {
		console.log(err)
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



// ORDER

app.get('/api/get-order', (req, res) => {
	const id = req.query.id
	const where = id ? ' where o.id=?' : ';'

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
		`+ where 
	db.query(sql, [id], (err, result) => {
		res.send(result)
	})
})


app.post('/api/insert-order-shipping-status', (req, res) => {
	const orderId = req.body.orderId
	const statusId = req.body.statusId

	const date = '';

	const sql = "insert into order_shipping_status(order_id, shipping_status_id, date) values(?, ?);"
	db.query(sql, [orderId, statusId, date], (err, result) => {
		res.send(result)
	})
})

app.post('/api/delete-order-shipping-status', (req, res) => {
	const orderId = req.body.orderId
	const statusId = req.body.statusId

	const sql = "delete from order_shipping_status where order_id=? and shipping_status_id=?;"
	db.query(sql, [orderId, statusId], (err, result) => {
		res.send(result)
	})
})

// WISHLIST

app.get('/api/shop/wishlist/', async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ message: 'Missing userId' });
    }
console.log(userId)
    try {
        const [rows] = await db.query(
            `
            SELECT p.* 
            FROM wishlist w
            JOIN product p ON p.id = w.product_id
            WHERE w.user_id = ?
            `,
            [userId]
        );

        res.json({ wishlist: rows });
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        res.status(500).json({ message: 'Server error fetching wishlist' });
    }
});

app.post('/api/shop/wishlist/toggle', async (req, res) => {
	const { userId, productId } = req.body;
	console.log(req.body)

    if (!userId || !productId) {
        return res.status(400).json({ message: 'Missing userId or productId' });
    }

    try {
        const [rows] = await db.query(
            'SELECT * FROM wishlist WHERE user_id = ? AND product_id = ?',
            [userId, productId]
        );

        if (rows.length > 0) {
            // Item exists — remove from wishlist
            await db.query(
                'DELETE FROM wishlist WHERE user_id = ? AND product_id = ?',
                [userId, productId]
            );
            return res.json({ message: 'Product removed from wishlist' });
        } else {
            // Item not in wishlist — add it
            await db.query(
                'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)',
                [userId, productId]
            );
            return res.json({ message: 'Product added to wishlist' });
        }
    } catch (error) {
        console.error('Wishlist toggle error:', error);
        res.status(500).json({ message: 'Server error toggling wishlist' });
    }
})


// MENU
app.get('/api/get-menu', (req, res) => {
	const sql = `
		SELECT c1.id as subcategory_id, 
			c1.name as subcategory_name, 
			c2.id, c2.name as category_name, 
			c1.category_id 
		FROM category c2 
		LEFT JOIN subcategory c1 ON c2.id = c1.category_id
		;`
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
	
		res.send(resultArr)
	})
})

app.post('/api/upload', (req, res) => {
    multi_upload(req, res, function (err) {
	    //multer error
		if (err instanceof multer.MulterError) {
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

// DOWNLOAD EXAMPLE IMPORT FILE

app.get('/api/download-example-file', (req, res) => {
	const type = req.query.itemType
	const columns = JSON.parse(req.query.columns)

	// Create directory if it doesn't exist
    const dirPath = path.join(__dirname, 'uploads', 'import-example-file')
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

	const exampleFileName = 'example-' + type + '-file.xls'
	const exampleFilePath = path.join(dirPath, exampleFileName)

    // Check if the example file exists
    if (!fs.existsSync(exampleFilePath)) {
        createExampleFile(exampleFilePath, columns)
    }

    // Send the file to the user
    res.download(exampleFilePath, exampleFileName, (err) => {
        if (err) {
            console.error('Error during file download:', err)
            res.status(500).send('Error downloading file')
        }
    })
})

// Function to create the example Excel file
const createExampleFile = (filePath, columns) => {
    const headerRow = columns.map(col => col.label)
    const exampleRow = columns.map(col => col.example)

    // Prepare the data to be written to the file
    const data = []
    data.push(headerRow)  
    data.push(exampleRow) 

    // Create a new worksheet
    const ws = xlsx.utils.aoa_to_sheet(data)

    // Create a new workbook
    const wb = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1')

    xlsx.writeFile(wb, filePath)
}

// IMPORT EXCEL

// Set up multer for file upload
const storageImport = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    },
})

const upload = multer({ storage: storageImport })

app.post('/api/import-items', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const filePath = path.join(__dirname, 'uploads', req.file.filename);

    // Read and parse the Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const data = xlsx.utils.sheet_to_json(sheet);

	const table = req.body.table
    const columns = JSON.parse(req.body.columns)


    // Define columns (you would probably get this from the request or a config file)
    const columns2 = [
        { name: 'first_name', label: 'First name', example: 'John' },
        { name: 'last_name', label: 'Last name', example: 'Smith' },
        { name: 'email', label: 'E-mail', example: 'johnsmith@gmail.com' },
        { name: 'phone', label: 'Phone', example: '+1(501)-333-3334' },
        { name: 'birth', label: 'Date of birth', example: '1980-03-23' },
        { name: 'gender', label: 'Gender', example: 'M' },
    ];

    // Create a string of column names (for SQL INSERT)
    const columnNames = columns.map(col => col.name).join(', ');

    // Loop through the data and insert each row
    data.forEach(row => {
        // Extract the values for each column dynamically
        const values = columns.map(col => row[col.name]);
console.log(values)
return
        // Generate the placeholders for the SQL query (e.g. ?, ?, ?, ...)
        const placeholders = columns.map(() => '?').join(', ');

        // Prepare the dynamic SQL INSERT query
        const query = `INSERT INTO ${table} (${columnNames}) VALUES (${placeholders})`;

        // Execute the query to insert the row into the database
        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Error inserting data into the database:', err);
            } else {
                console.log('Row inserted:', results);
            }
        });
    });

    // Send response
    res.send('File uploaded and data imported successfully');
});

// ADMIN - GET ITEMS
app.get('/api/get-items', (req, res) => {
    const id = req.query.id;
    const table = req.query.table;

    if (!table) {
        return res.status(400).json({ error: "Table name is required" });
    }

    const where = id ? ' WHERE id = ?' : '';
    const sql = `SELECT * FROM \`${table}\`${where}`;

    db.query(sql, id ? [id] : [], (err, items) => {
        if (err) {
            console.error("Error fetching items:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (!items.length) {
            return res.status(200).json([]); // No items found, return empty array
        }

        const itemIds = items.map(item => item.id);

        const fileSql = `SELECT * FROM uploaded_files WHERE item_id IN (?) AND item_type = ?`;

        db.query(fileSql, [itemIds, table], (fileErr, files) => {
            if (fileErr) {
                console.error("Error fetching files:", fileErr);
                return res.status(500).json({ error: "Database error" });
            }

            // Attach files to their corresponding items
            const itemsWithFiles = items.map(item => ({
                ...item,
                files: files.filter(file => file.item_id === item.id)
            }));

            res.status(200).json(itemsWithFiles);
        });
    });
});

// ADMIN - SAVE ITEM

// File filter (optional)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only images and PDFs are allowed!'), false);
    }
};

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure that 'table' and 'id' exist, fallback to 'default' if missing
        const table = req.body.itemType || 'default';
        const itemId = req.body.id || 'default';

        const uploadDir = path.join(__dirname, '../client/public/uploads/', table, itemId);

        // Create the directory and all missing parent directories if needed
        fs.mkdir(uploadDir, { recursive: true }, (err) => {
            if (err) {
                console.error("Error creating directory:", err);
                return cb(err, uploadDir); // Pass error to callback
            }
            cb(null, uploadDir); // Directory is ready
        });
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique file names
    }
});

// Initialize multer
const uploadFiles = multer({
    storage: storage,
    limits: { fileSize: 15 * 1024 * 1024 }, // 15MB max file size
    fileFilter: fileFilter
});

const deleteFiles = (deletedFiles, itemType, itemId) => {
	if (!deletedFiles || deletedFiles.length === 0) {
            return; // No files to delete
        }

        // Prepare SQL query to delete files from the database
        const deleteSql = "DELETE FROM uploaded_files WHERE id = ?";
        const deleteParams = deletedFiles.map(file => [file.id]);

        // Delete files from the database
        db.query(deleteSql, deleteParams, (err, result) => {
            if (err) {
                console.error('Error deleting files from database:', err);
                return 
            }

            const rootDir = path.join(__dirname, '../client/public/uploads/', itemType)

            // Now delete files from the server file system
            const uploadDir = path.join(rootDir, itemId);
            deletedFiles.forEach(file => {
                const filePath = path.join(uploadDir, file.filename);
                
                // Delete the file from the server if it exists
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Error deleting file ${file.filename}:`, err);
                    } else {
                        console.log(`File ${file.filename} deleted from server.`);
                    }
                });
            });

            // Check if the uploadDir is empty after deletion and remove it if it is
	        if (removeDirectoryIfEmpty(uploadDir)) {
	            // If uploadDir was removed, check if rootDir is empty
	            if (removeDirectoryIfEmpty(rootDir)) {
	                console.log(`Root directory ${rootDir} deleted as it is empty.`);
	            }
	        }
        });
}

function removeDirectoryIfEmpty(directoryPath) {
	try {
    	// Read the contents of the directory synchronously
    	const files = fs.readdirSync(directoryPath);

    	// If the directory is empty, delete it
    	if (files.length === 0) {
        	fs.rmSync(directoryPath, { recursive: true, force: true });
        	console.log(`Directory ${directoryPath} deleted as it is empty.`);
        	return true;
 		}
	} catch (err) {
    	console.error(`Error checking or deleting directory ${directoryPath}:`, err);
	}
	return false;
}

// Handle File Uploads + Item Save
app.post('/api/save-item', uploadFiles.array('files', 10), (req, res) => {
    const id = req.body.id;
    const table = req.body.table;
    const columns = JSON.parse(req.body.columns);
    const deletedFiles = JSON.parse(req.body.deletedFiles)

console.log('deleted files:', deletedFiles)
    console.log("Received body:", req.body);
    console.log("Received files:", req.files); // Debugging

    // Filter out file-type fields
    const nonFileColumns = columns.filter(field => field.type !== 'file');

    // Prepare SQL column names & placeholders dynamically
    const columnNames = nonFileColumns.map(field => `\`${field.name}\``).join(', ');
    const placeholders = nonFileColumns.map(() => '?').join(', ');

    // Process values dynamically
    const values = nonFileColumns.map(field => req.body[field.name] || null);

    let sql = '';
    let params = [];

    if (id) {
        // UPDATE item
        const updateSet = nonFileColumns.map(field => `\`${field.name}\` = ?`).join(', ');
        sql = `UPDATE \`${table}\` SET ${updateSet} WHERE id = ?;`;
        params = [...values, id];
    } else {
        // INSERT item
        sql = `INSERT INTO \`${table}\` (${columnNames}) VALUES (${placeholders});`;
        params = values;
    }

    console.log('SQL Query:', sql);
    console.log('Params:', params);

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('DB Error:', err);
            return res.status(500).send({ error: "Database error", details: err });
        }

        const itemId = id || result.insertId;

        //delete files from server and db
        if(deletedFiles && deletedFiles.length > 0) {
        	deleteFiles(deletedFiles, table, id)
        }

        // Ensure we have files before attempting to insert them
        if (req.files && req.files.length > 0) {
            const fileValues = req.files.map(file => [
                itemId,
                table,
                file.filename,
                file.path,
                file.mimetype
            ]);

            const fileSql = `INSERT INTO uploaded_files (item_id, item_type, file_name, file_path, file_type) VALUES ?`;

            db.query(fileSql, [fileValues], (fileErr, fileResult) => {
                if (fileErr) {
                    console.error('File DB Error:', fileErr);
                    return res.status(500).send({ error: "File database error", details: fileErr });
                }
                res.status(200).send({ message: 'Item saved successfully', itemId });
            });
        } else {
            res.status(200).send({ message: 'Item saved successfully', itemId });
        }
    });
});

// SHOP - GET ITEMS
app.get('/api/shop/get-items', async (req, res) => {
    const {table, joinTables, ...params } = req.query;

	if (!table) {
	    return res.status(400).json({ error: "Table name is required" });
	}

	const queryParams = [];
	let whereClause = '';

	queryParams.push(table); // for f.item_type = ?

	for (const [key, value] of Object.entries(params)) {
	    if (value) {
	        whereClause += whereClause ? ' AND ' : 'WHERE ';
	        whereClause += `\`${table}\`.${key} = ? `;
	        queryParams.push(value);
	    }
	}

	let joinQuery = '';
	let selectFields = '';

	if (joinTables && joinTables.length > 0) {
	    joinTables.forEach((item) => {
	        const joinedTable = item.table;
	        const pivot = `${table}_${joinedTable}`;
	        const itemIdField = `${joinedTable}_id`;

	        joinQuery += `
	            LEFT JOIN \`${pivot}\` ON \`${pivot}\`.${table}_id = \`${table}\`.id
	            LEFT JOIN \`${joinedTable}\` ON \`${pivot}\`.${itemIdField} = \`${joinedTable}\`.id
	        `;

	        let jsonFields = '';

	        if (item.fields) {
	            item.fields.forEach((field) => {
	                jsonFields += `'${field}', \`${joinedTable}\`.${field}, `;
	            });
	        }

	        // Remove trailing comma and space
	        jsonFields = jsonFields.trim().replace(/,\s*$/, '');

	        if (jsonFields) {
	            selectFields += `,
	                JSON_ARRAYAGG(
	                    JSON_OBJECT(${jsonFields})
	                ) AS \`${joinedTable}\`
	            `;
	        }
	    });
	}

	const sql = `
	    SELECT 
	        \`${table}\`.*,
	        JSON_ARRAYAGG(
	            IF(f.id IS NOT NULL,
	                JSON_OBJECT(
	                    'id', f.id,
	                    'file_name', f.file_name,
	                    'item_id', f.item_id,
	                    'item_type', f.item_type
	                ),
	                NULL
	            )
	        ) AS files
	        ${selectFields}
	    FROM \`${table}\`
	    ${joinQuery}
	    LEFT JOIN uploaded_files AS f
	        ON f.item_id = \`${table}\`.id AND f.item_type = ?
	    ${whereClause}
	    GROUP BY \`${table}\`.id
	`;

  //  return

    try {
        const [results] = await db.query(sql, queryParams);

        const parsed = results.map(row => {
            // Parse files
            try {
                row.files = JSON.parse(row.files).filter(f => f && f.id !== null);
            } catch {
                row.files = [];
            }

            // Parse join table fields
            if (joinTables && joinTables.length > 0) {
                joinTables.forEach(item => {
                    const field = item.table;
                    try {
                        row[field] = JSON.parse(row[field]).filter(e => e && e.id !== null);
                    } catch {
                        row[field] = [];
                    }
                });
            }

            return row;
        });

        res.status(200).json(parsed);

    } catch (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Database error" });
    }
});



// DELETE ITEM
app.post('/api/delete-item', (req, res) => {
	const table = req.body.table
	const id = req.body.id

	const sql = `DELETE FROM \`${table}\` WHERE id=?;`

	db.query(sql, [id], (err, result) => {
		res.status(200).send(result)
	})
})

 //////////////////


 // REGISTER
const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret' // Put in .env for real use

app.post('/api/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const [existingUser] = await db.query('SELECT id FROM user WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const [result] = await db.query(
            'INSERT INTO user (first_name, last_name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
            [firstName, lastName, email, hashedPassword]
        );

        const newUserId = result.insertId;

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUserId,
                firstName,
                lastName,
                email
            }
        });
    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ message: 'Something went wrong during registration' });
    }
});


// LOGIN

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find user by email using raw SQL
        const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar || null, // optional if avatar is stored
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Something went wrong during login' });
    }
});

// Save Order
app.post('/api/shop/save-order', async (req, res) => {
    const {
        user_id,
        total,
        payment_method,
        shipping_method,
        discount = 0,
        shipping_cost = 0,
        tax_amount = 0,
        shippingData,
        cartItemsArr
    } = req.body;

    try {
        // Check if shipping info already exists
        const [existing] = await db.query(
            'SELECT id FROM shipping_information WHERE address = ? AND user_id = ?',
            [shippingData.address, user_id]
        );

        let shipping_id;

        if (existing.length > 0) {
            shipping_id = existing[0].id;
        } else {
            const [result] = await db.query(
                `INSERT INTO shipping_information 
                    (user_id, name, address, city, state, postal_code, country, phone, email, instructions) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    user_id,
                    shippingData.name,
                    shippingData.address,
                    shippingData.city,
                    shippingData.state,
                    shippingData.postal_code,
                    shippingData.country,
                    shippingData.phone,
                    shippingData.email,
                    shippingData.instructions
                ]
            );
            shipping_id = result.insertId;
        }

        const orderCode = `ORD-${uuidv4().slice(0, 8).toUpperCase()}`;

        const [orderInsert] = await db.query(
            `INSERT INTO \`order\`
                (code, user_id, total, shipping_id, payment_method, shipping_method, discount, shipping_cost, tax_amount, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [
                orderCode,
                user_id,
                total,
                shipping_id,
                payment_method,
                shipping_method,
                discount,
                shipping_cost,
                tax_amount
            ]
        );

        const order_id = orderInsert.insertId;

        // Insert into order_shipping_information to link shipping info
        await db.query(
            `INSERT INTO order_shipping_information (order_id, shipping_information_id) VALUES (?, ?)`,
            [order_id, shipping_id]
        );

        // Insert each product into order_product with quantity and price
        const orderProductPromises = cartItemsArr.map(async (item) => {
            const { product_id, quantity, price } = item;

            await db.query(
                `INSERT INTO order_product (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`,
                [order_id, product_id, quantity, price]
            );
        });

        await Promise.all(orderProductPromises);

        res.status(201).json({
            message: 'Order placed successfully',
            order_id: order_id,
            order_code: orderCode
        });
    } catch (err) {
        console.error('Error saving order:', err);
        res.status(500).json({ error: 'Failed to save order' });
    }
});

// CONTACT FORM 

// Load from .env
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_TO = process.env.EMAIL_TO || EMAIL_USER; // recipient

app.post('/contact', async (req, res) => {
	const { firstName, lastName, email, message, recaptchaToken } = req.body;

	if (!recaptchaToken) {
		return res.status(400).json({ error: 'reCAPTCHA token missing' });
	}

	try {
		// Verify reCAPTCHA token
		const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
		const response = await axios.post(
			verifyUrl,
			new URLSearchParams({
				secret: RECAPTCHA_SECRET_KEY,
				response: recaptchaToken,
			})
		);

		const { success, score, action } = response.data;
		if (!success) {
			return res.status(403).json({ error: 'reCAPTCHA verification failed' });
		}

		// Setup Nodemailer transport
		const transporter = nodemailer.createTransport({
			service: 'gmail', 
			auth: {
				user: EMAIL_USER,
				pass: EMAIL_PASS,
			},
		});

		// Compose email
		const mailOptions = {
			from: `"Website Contact" <${EMAIL_USER}>`,
			to: EMAIL_TO,
			subject: 'New Contact Message',
			text: `
				Name: ${name}
				Email: ${email}
				Message: ${message}
			`,
		};

		await transporter.sendMail(mailOptions);

		return res.status(200).json({ message: 'Message sent successfully.' });
	} catch (err) {
		console.error('Error in /contact:', err);
		return res.status(500).json({ error: 'Failed to send message.' });
	}
});

// SEARCH

// SEARCH AUTOCOMPLETE
app.get('/api/search-autocomplete', async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const searchTerm = query.trim().toLowerCase();

  try {
    const [categoryRows] = await db.query(`SELECT name FROM category`);
    const [productRows] = await db.query(`SELECT name FROM product`);

    const categoryWords = categoryRows.flatMap(row =>
      row.name.split(/\s+/)
    );
    const productWords = productRows.flatMap(row =>
      row.name.split(/\s+/)
    );

    const allWords = [...categoryWords, ...productWords];

    const uniqueMatches = [...new Set(
      allWords.filter(word =>
        word.toLowerCase().includes(searchTerm)
      )
    )];

    res.json({ suggestions: uniqueMatches });

  } catch (err) {
    console.error('Autocomplete search error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// SEARCH
app.get('/api/search', async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const words = query
    .toLowerCase()
    .split(/\s+/) // split on whitespace
    .filter(Boolean);

  if (words.length === 0) {
    return res.status(400).json({ error: 'No valid search terms provided.' });
  }

  try {
    // Category search (match any word)
    const categoryConditions = words.map(() => `LOWER(name) LIKE ?`).join(' OR ');
    const categoryValues = words.map(word => `%${word}%`);

    const [categories] = await db.query(
      `SELECT id, name FROM categories WHERE ${categoryConditions}`,
      categoryValues
    );

    const categoryIds = categories.map(cat => cat.id);

    // Product search (match any word in name or description)
    const productConditions = words
      .map(() => `(LOWER(p.name) LIKE ? OR LOWER(p.description) LIKE ?)`)
      .join(' OR ');

    const productValues = words.flatMap(word => [`%${word}%`, `%${word}%`]);

    let queryStr = `
      SELECT p.id, p.name, p.description, p.category_id
      FROM products p
      WHERE ${productConditions}
    `;

    // Include products from matched categories
    if (categoryIds.length > 0) {
      const placeholders = categoryIds.map(() => '?').join(',');
      queryStr += ` OR p.category_id IN (${placeholders})`;
      productValues.push(...categoryIds);
    }

    const [products] = await db.query(queryStr, productValues);

    res.json({ products });

  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/////////////////////////

app.listen(3001, () => {
	console.log('run')
})