var express = require('express');
var router = express.Router();

var auth = require('./auth.js');
var products = require('./products.js');
var user = require('./users.js');
var wishlist = require('./wishlists.js');
var category = require('./categories.js');
var search = require('./search.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.post('/register', auth.register);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/users/:id/wishlists', wishlist.getWishlistsByUser);

router.get('/api/v1/categories/:id/wishlists/approved', wishlist.getWishlistsByCategory);

router.post('/api/v1/wishlists', wishlist.create);
router.get('/api/v1/wishlists', wishlist.getAll); 
router.get('/api/v1/wishlists/approved', wishlist.getApproved); 
router.get('/api/v1/wishlists/:id', wishlist.getOne); 
router.delete('/api/v1/wishlists/:id', wishlist.delete);
router.put('/api/v1/wishlists/:id', wishlist.update);

router.post('/api/v1/wishlists/:id/wishes', wishlist.createWish);
router.put('/api/v1/wishlists/:wishlistId/wishes/:wishId', wishlist.updateWish);
router.delete('/api/v1/wishlists/:wishlistId/wishes/:wishId', wishlist.deleteWish);

router.get('/api/v1/categories', category.getAll); 
router.get('/api/v1/categories/:id', category.getOne);

router.get('/api/v1/search/:keywords', search.getAll); 

/* SAMPLE ROUTES */
router.get('/api/v1/products', products.getAll);
router.get('/api/v1/product/:id', products.getOne);
router.post('/api/v1/product/', products.create);
router.put('/api/v1/product/:id', products.update);
router.delete('/api/v1/product/:id', products.delete);
/* [END] SAMPLE ROUTES */


/*
 * Routes that can be accessed only by authenticated & authorized users
 */

router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/users/:id', user.getOne);
router.delete('/api/v1/admin/users/:id', user.delete);
router.put('/api/v1/users/:id/rename', user.rename); 
router.get('/api/v1/users/:id/profile', user.getOne);
router.put('/api/v1/users/:id/profile', user.updateUser);

router.post('/api/v1/admin/categories', category.create); 
router.delete('/api/v1/admin/categories/:id', category.delete);
router.put('/api/v1/admin/categories/:id/rename', category.rename);

router.get('/api/v1/admin/wishlists', wishlist.getAll); 
router.put('/api/v1/admin/wishlists/:id/approve/:status', wishlist.approve);
/* SAMPLE ROUTES */
/*
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
//router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);
*/
/* [END] SAMPLE ROUTES */

module.exports = router;