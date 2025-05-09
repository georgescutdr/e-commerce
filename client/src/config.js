
export const siteConfig = {
	serverUrl: 'http://localhost:3001',
} 

export const adminCategories = [
	{name: 'products', label: 'Products & Catalog'},
	{name: 'sales', label: 'Sales & Promotions'},
	{name: 'orders', label: 'Shipping & Orders'},
	{name: 'content', label: 'Content & Users'},
]

export const shopConfig = {
	getItemsUrl: siteConfig.serverUrl + '/api/shop/get-items',
	api: {
		getWishlistUrl: siteConfig.serverUrl + '/api/shop/wishlist/',
		wishlistToggleUrl: siteConfig.serverUrl + '/api/shop/wishlist/toggle',
		saveOrderUrl: siteConfig.serverUrl + '/api/shop/save-order',
		loginApiUrl: siteConfig.serverUrl + '/api/login',
		registerApiUrl: siteConfig.serverUrl + '/api/register',
		searchApiUrl: siteConfig.serverUrl + '/api/search',
		searchAutocompleteUrl: siteConfig.serverUrl + '/api/search-autocomplete',
		submitVoucherUrl: siteConfig.serverUrl + '/api/shop/submit-voucher',
		getProductAttributesUrl: siteConfig.serverUrl + '/api/shop/get-product-attributes',
		getPriceBoundsUrl: siteConfig.serverUrl + '/api/shop/get-price-bounds',
		getCategoryBrandsUrl: siteConfig.serverUrl + '/api/shop/get-category-brands'
	},
	items: [
		{
			'path': '/',
			'table': '',
			'joinTables': [],
			'listType': 'multiple',
			'label': '',
			'protectedRoute': false,
			'component': 'home-page'
		},
		{
			'path': '/product-reviews/:productId',
			'table': 'review',
			'joinTables': [],
			'listType': 'multiple',
			'label': '',
			'protectedRoute': false,
			'component': 'view-items'
		},
		{
			'path': '/review/create-review/:productId',
			'table': 'review',
			'joinTables': [],
			'listType': 'multiple',
			'label': '',
			'protectedRoute': false,
			'component': 'create-review'
		},
		{
			'path': '/login',
			'table': 'user',
			'joinTables': [],
			'listType': 'multiple',
			'label': 'Login',
			'protectedRoute': false,
			'component': 'login-form'
		},
		{
			'path': '/register',
			'table': 'user',
			'joinTables': [],
			'listType': 'multiple',
			'label': 'Register',
			'protectedRoute': false,
			'component': 'register-form'
		},
		{
			'path': '/account',
			'table': 'user',
			'joinTables': [],
			'listType': 'multiple',
			'label': 'My account',
			'sections': [
				{'name': 'Account Info', 'fields': ['first_name', 'last_name', 'email']},
				{'name': 'Contact Info', 'fields': ['phone', 'address']},
			],
			'fields': [
			  { name: 'first_name', label: 'First Name', type: 'text' },
			  { name: 'last_name', label: 'Last Name', type: 'text' },
			  { name: 'email', label: 'Email', type: 'email' },
			  { name: 'phone', label: 'Phone', type: 'tel' },
			  { name: 'address', label: 'Address', type: 'text' },
			],
			'protectedRoute': false,
			'component': 'user-profile'
		},
		{
			'path': '/wishlist',
			'table': 'wishlist',
			'joinTables': [],
			'listType': 'multiple',
			'label': 'Wishlist',
			'protectedRoute': false,
			'component': 'wishlist'
		},
		{
			'path': '/shopping-cart',
			'table': '',
			'joinTables': [],
			'listType': 'multiple',
			'label': 'Shopping cart',
			'protectedRoute': false,
			'component': 'shopping-cart'
		},
		{
			'path': '/checkout',
			'table': '',
			'joinTables': [],
			'listType': 'multiple',
			'label': 'Checkout',
			'protectedRoute': false,
			'component': 'checkout'
		},
		{
			'path': '/orders',
			'table': 'order',
			'joinTables': [],
			'listType': 'multiple',
			'label': 'My orders',
			'protectedRoute': false,
			'component': 'orders'
		},
		{
			'path': '/order-details/:orderId',
			'table': 'user',
			'joinTables': [],
			'listType': 'multiple',
			'label': 'Login',
			'protectedRoute': false,
			'component': 'order-details'
		},
		{
			'path': '/brands/',
			'table': 'brand',
			'joinTables': [],
			'listType': 'multiple',
			'label': 'Brands',
			'component': 'view-items'
		},
		{
			'path': '/brands/:brand/pd/:id',
			'table': 'brand',
			'joinTables': [],
			'listType': 'single',
			'component': 'view-item'
		},
		{
			'path': '/:category/pd/:id/&type=product',
			'table': 'product',
			'joinTables': [],
			'listType': 'multiple',
			'component': 'view-items'
		},
		{
			'path': '/:category/:subcategory/:product/pd/:id',
			'table': 'category',
			'joinTables': [],
			'listType': 'multiple',
			'component': 'view-items'
		},
		{
			'path': '/:product/pd/:id/view_product',
			'table': 'product',
			'joinTables': [
			//	{table: 'attribute_value', fields: ['id', 'attribute_id', 'value']},
				{table: 'category', fields: ['id', 'name', 'description']}, 
				{table: 'brand', fields: ['id', 'name', 'description'], pivot: true}, 
				{table: 'voucher', fields: ['id', 'name', 'description', 'type', 'value', 'expires_at', 'num', 'code'], pivot: true}, 
				{table: 'promotion', fields: ['id', 'name', 'description', 'type', 'value', 'start_date', 'end_date', 'home'], pivot: true}, 
				{table: 'option', fields: ['id', 'name', 'description'], pivot: true},
				{table: 'review', fields: ['id', 'rating'], pivot: true},
				{table: 'attribute', fields: ['id', 'name'], pivot: true, joinTables: [
						{table: 'attribute_value', pivot_table: 'product_attribute_value'}
					]},
				{table: 'image', fields: ['id', 'image_name', 'thumb'], pivot: true},
			],
			'listType': 'single',
			'component': 'view-item'
		},
		{
			'path': '/contact',
			'table': '',
			'label': 'Contact',
			'joinTables': [],
			'listType': 'multiple',
			'fields': [
			  { name: 'firstName', label: 'First Name', type: 'text' },
			  { name: 'lastName', label: 'Last Name', type: 'text' },
			  { name: 'email', label: 'Email', type: 'email' },
			  { name: 'message', label: 'Message', type: 'textarea' },
			],
			'component': 'contact-form'
		},
		{
			'path': '/search/:search',
			'submitApi': siteConfig.serverUrl + '/api/shop/search/', 
			'label': '',
			'joinTables': [],
			'listType': 'multiple',
			'component': 'search-page'
		},
		{
			'path': '/search/pd/:categoryId/',
			'submitApi': siteConfig.serverUrl + '/api/shop/search/', 
			'label': '',
			'table': 'product',
			'joinTables': [],
			'listType': 'multiple',
			'component': 'search-page'
		},
		{
			'path': '/:promotionName/pd/:id/?type=view_promotion',
			'table': 'promotion', 
			'label': '',
			'joinTables': [],
			'listType': 'single',
			'component': 'view-item'
		},

	],
}

export const config = {
	dashboard: {
		active: true,
	},
	api: {
		getItemsUrl: siteConfig.serverUrl + '/api/get-items',
		saveItemUrl: siteConfig.serverUrl + '/api/save-item',
		deleteItemUrl: siteConfig.serverUrl + '/api/delete-item',
		importItemsUrl: siteConfig.serverUrl + '/api/import-items',
		exampleFileUrl: siteConfig.serverUrl + '/api/download-example-file',
	},
	items: [
		{
			title: 'Category',
			description: 'Define and organize product categories with parent-child relationships.',
			dataType: 'list',
			type: 'category',
			table: 'category',
			category: 'products',
			fields: [
				{name: 'name', type: 'text', label: 'Name', required: true},
				{name: 'description', type: 'textarea', label: 'Description', required: false},
				{name: 'slug', type: 'text', label: 'Slug', required: true},
				{name: 'parent_id', type: 'select', label: 'Parent category', required: false, options: {
					url: siteConfig.serverUrl + '/api/get-items/',
					table: 'category',
				}},
				{name: 'file', type: 'file', label: 'Image', required: false},
			]
		},
		{
			title: 'Product options',
			description: 'Specify different configurations and variations for products.',
			dataType: 'list',
			type: 'option',
			table: 'option',
			category: 'products',
			fields: [
				{name: 'name', type: 'text', label: 'Name', required: true},
				{name: 'description', type: 'textarea', label: 'Description', required: false},
			]
		},	
		{
			title: 'Brands',
			description: 'Manage product brand identities with names, descriptions, and images.',
			dataType: 'list',
			type: 'brand',
			table: 'brand',
			category: 'products',
			fields: [
				{name: 'name', type: 'text', label: 'Name', required: true},
				{name: 'description', type: 'textarea', label: 'Description', required: false},
				{name: 'slug', type: 'text', label: 'Slug', required: true},
				{name: 'files', type: 'file', label: 'Image', required: false},
			]
		},
		{
			title: 'Promotions',
			description: 'Create special offers, discounts, and promotional campaigns.',
			dataType: 'list',
			type: 'promotion',
			table: 'promotion',
			category: 'sales',
			fields: [
				{name: 'name', type: 'text', label: 'Name', required: true},
				{name: 'description', type: 'textarea', label: 'Description', required: false},
				{name: 'type', type: 'select', label: 'Type', required: true, options: [
					{name: 'percent (%)', value: 'percent'}, 
					{name: 'value ($)', value: 'value'}
				]},
				{name: 'value', type: 'text', label: 'Value', required: true},
				{name: 'start_date', type: 'date', label: 'Start date', required: true},
				{name: 'end_date', type: 'date', label: 'End date', required: true},
				{name: 'home', type: 'switch', label: 'Appears on home', required: false},
				{name: 'file', type: 'file', label: 'Image', required: false},
			]
		},
		{
			title: 'Shipping method',
			description: 'Define available delivery options and pricing for orders.',
			dataType: 'list',
			type: 'shipping-method',
			table: 'shipping_method',
			category: 'orders',
			fields: [
				{name: 'name', type: 'text', label: 'Name', required: true},
				{name: 'description', type: 'textarea', label: 'Description', required: false},
				{name: 'price', type: 'text', label: 'Price', required: true},
			]
		},
		{
			title: 'Shipping status',
			description: 'Define the shipping phases for your products.',
			dataType: 'list',
			type: 'shipping-status',
			table: 'shipping_status',
			category: 'orders',
			fields: [
				{name: 'name', type: 'text', label: 'Name', required: true},
				{name: 'description', type: 'textarea', label: 'Description', required: false},
			]
		},
		{
			title: 'Vouchers',
			description: 'Generate and distribute discount codes with flexible expiration dates.',
			dataType: 'list',
			type: 'voucher',
			table: 'voucher',
			category: 'sales',
			fields: [
				{name: 'name', type: 'text', label: 'Name', required: true},
				{name: 'description', type: 'textarea', label: 'Description', required: false},
				{name: 'type', type: 'select', label: 'Type', required: true, options: [
					{name: 'percent (%)', value: 'percent'}, 
					{name: 'value ($)', value: 'value'}
				]},
				{name: 'value', type: 'text', label: 'Value', required: true},
				{name: 'expires', type: 'date', label: 'Expires', required: true},
				{name: 'num', type: 'text', label: 'Number of vouchers', required: true},
				{name: 'code', type: 'text', label: 'Code', required: true},
			]
		},
		{
			title: 'Products',
			description: 'Manage your products.',
			dataType: 'tabs',
			type: 'product',
			table: 'product',
			category: 'products',
			fields: [
					{name: 'category_id', type: 'select', label: 'Category', required: true, optionsUrl: siteConfig.serverUrl + '/api/get-categories/?type=children'},
					{name: 'brand_id', type: 'select', label: 'Brand', required: true, optionsUrl: siteConfig.serverUrl + '/api/get-brand'},
					{name: 'name', type: 'text', label: 'Name', required: true},
					{name: 'description', type: 'textarea', label: 'Description', required: false},
					{name: 'price', type: 'text', label: 'Price', required: true},
					{name: 'qty', type: 'text', label: 'Quantity', required: true},
					{name: 'slug', type: 'text', label: 'Slug', required: true},
					{name: 'visible', type: 'switch', label: 'Visible', required: true},
					{name: 'file', type: 'file', label: 'Product Image', required: false},
			],
			tabs: [
			{name: 'form', label: 'Details'},
			{name: 'attributes', label: 'Attributes'},
			{name: 'promotions', label: 'Promotions'},
			{name: 'vouchers', label: 'Vouchers'},
			{
				name: 'promotions',
				label: 'Promotion Assignment',
				component: 'PromotionAssignment', // Inject custom component
				apiUrl: siteConfig.serverUrl + '/api/get-promotions',
				editApiUrl: siteConfig.serverUrl + '/api/assign-promotion',
				fields: [
					{name: 'promotion_id', type: 'select', label: 'Select Promotion', required: true, optionsUrl: siteConfig.serverUrl + '/api/get-promotions'},
				]
			},
			{
				name: 'vouchers',
				label: 'Voucher Assignment',
				component: 'VoucherAssignment', // Inject custom component
				apiUrl: siteConfig.serverUrl + '/api/get-vouchers',
				editApiUrl: siteConfig.serverUrl + '/api/assign-voucher',
				fields: [
					{name: 'voucher_id', type: 'select', label: 'Select Voucher', required: true, optionsUrl: siteConfig.serverUrl + '/api/get-vouchers'},
				]
			},
			{
				name: 'attributes',
				label: 'Product Attributes',
				component: 'ProductAttributes', // Inject custom component
				apiUrl: siteConfig.serverUrl + '/api/get-attributes',
				editApiUrl: siteConfig.serverUrl + '/api/update-attributes',
				fields: [
					{name: 'attribute_name', type: 'text', label: 'Attribute Name', required: true},
					{name: 'attribute_value', type: 'text', label: 'Attribute Value', required: true},
				]
			}
		]
		},
		{
			title: 'Orders',
			description: 'Monitor and manage customer orders, payments, and shipping details.',
			dataType: 'table',
			type: 'order',
			table: 'order',
			category: 'orders',
			tableColumns: [
				{field: 'id', header: 'ID', sortable: true},
				{field: 'code', header: 'Code', sortable: true},
				{field: 'username', header: 'User name', sortable: true},
				{field: 'email', header: 'E-mail', sortable: true},
				{field: 'payment_method', header: 'Payment method', sortable: true},
				{field: 'payment_status', header: 'Payment status', sortable: true},
				{field: 'order_status', header: 'Order status', sortable: true},
				{field: 'discount', header: 'Discount', sortable: true},
				{field: 'total', header: 'Total', sortable: true},
				{field: 'order_date', header: 'Order date', sortable: true},
			]
		},
		{
			title: 'Pages',
			description: 'Control static content pages with custom ordering and SEO-friendly slugs.',
			dataType: 'list',
			type: 'page',
			table: 'page',
			category: 'content',
			fields: [
				{name: 'name', type: 'text', label: 'Name', required: true},
				{name: 'description', type: 'textarea', label: 'Description', required: false},
				{name: 'slug', type: 'text', label: 'Slug', required: true},
				{name: 'order', type: 'text', label: 'Menu order', required: true},
			]
		},
		{
			title: 'Users',
			description: 'Oversee registered users, their roles, and account settings.',
			dataType: 'table',
			type: 'user',
			table: 'user',
			category: 'content',
			tableColumns: [
				{field: 'id', header: 'ID', sortable: true},
				{field: 'first_name', header: 'First name', sortable: true},
				{field: 'last_name', header: 'Last name', sortable: true},
				{field: 'email', header: 'E-mail', sortable: true},
				{field: 'gender', header: 'Gender', sortable: true},
				{field: 'role', header: 'Role', sortable: true},
				{field: 'newsletter', header: 'Subscribed to newsletter', sortable: true},
				{field: 'last_login', header: 'Last login', sortable: true},
				{field: 'created_at', header: 'Created at', sortable: true},
				{field: 'updated_at', header: 'Updated at', sortable: true},
			],
			fields: [
				{name: 'first_name', type: 'text', label: 'First name', required: true},
				{name: 'last_name', type: 'text', label: 'Last name', required: true},
				{name: 'password', type: 'password', label: 'Password', required: true},
				{name: 'email', type: 'text', label: 'E-mail', required: true},
				{name: 'phone', type: 'text', label: 'Phone', required: true},
				{name: 'file', type: 'file', label: 'Image', required: true},
				{name: 'birth', type: 'date', label: 'Date of birth', required: true},
				{name: 'gender', type: 'select', label: 'Gender', required: true, options: [
					{name: 'Male', value: 'M'},
					{name: 'Female', value: 'F'}
				]},
				{name: 'newsletter', type: 'switch', label: 'Subscribed to newsletter', required: false},
			],
			import: {
				label: 'Import users',
				description: 'Upload and process user data from an Excel or CSV file.',
				table: 'user',
				route: '/admin/import-users',
				columns: [
					{name: 'first_name', label: 'First name', example: 'John'}, 
					{name: 'last_name', label: 'Last name', example: 'Smith'},
					{name: 'email', label: 'E-mail', example: 'johnsmith@gmail.com'},
					{name: 'phone', label: 'Phone', example: '+1(501)-333-3334'},
					{name: 'birth', label: 'Date of birth', example: '1980-03-23'},
					{name: 'gender', label: 'Gender', example: 'M'},
				]
			}
		},
	]
}

                    