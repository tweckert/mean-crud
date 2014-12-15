var Tshirt = require('../database/models/tshirt.js');

module.exports = function(app) {


  /**
   * Retrieves all tshirts.
   */
  findAllTshirts = function(req, res) {
	
	  console.log("GET - /tshirts");
	  
	  return Tshirt.find(function(err, tshirts) {
		  
		  if(!err) {
			  
			  return res.send(tshirts);
		  } else {
			  
			  res.statusCode = 500;
			  console.log('Internal error(%d): %s',res.statusCode,err.message);
			  return res.send({ error: 'Server error' });
		  }
	  });
  };


  /**
   * Retrieves a tshirt by its ID.
   */
  findById = function(req, res) {
	  
	  console.log("GET - /tshirt/:id");
	  
	  return Tshirt.findById(req.params.id, function(err, tshirt) {
		  
		  if(!tshirt) {
			  
			  res.statusCode = 404;
			  return res.send({ error: 'Not found' });
		  }
		  
		  if(!err) {
			  
			  return res.send({ status: 'OK', tshirt:tshirt });
		  } else {
			  
			  res.statusCode = 500;
			  console.log('Internal error(%d): %s', res.statusCode, err.message);
			  return res.send({ error: 'Server error' });
		  }
	  });
  };


  /**
   * Creates a new tshirt.
   */
  addTshirt = function(req, res) {
	  
	  console.log('POST - /tshirt');
	  
	  var tshirt = new Tshirt({
		  model:    req.body.model,
		  style:    req.body.style,
		  size :    req.body.size,
		  color:    req.body.color,
		  price:    req.body.price
	  });
	  
	  tshirt.save(function(err) {
		  
		  if(err) {
			  
			  console.log('Error while saving tshirt: ' + err);
			  res.send({ error:err });
			  return;
		  } else {
			  
			  console.log("New tshirt created");
			  return res.send({ status: 'OK', tshirt:tshirt });
		  }
	  });
  };

  
  /**
   * Updates a tshirt by its ID.
   */
  updateTshirt = function(req, res) {
	  
	  console.log("PUT - /tshirt/:id");
	  
	  return Tshirt.findById(req.params.id, function(err, tshirt) {
		  
		  if(!tshirt) {
			  
			  res.statusCode = 404;
			  return res.send({ error: 'Not found' });
		  }
		  
		  if (req.body.model != null) tshirt.model = req.body.model;
		  if (req.body.price != null) tshirt.price = req.body.price;
		  if (req.body.style != null) tshirt.style = req.body.style;
		  if (req.body.size != null) tshirt.size  = req.body.size;
		  if (req.body.colour != null) tshirt.color = req.body.color;
		  
		  return tshirt.save(function(err) {
			  
			  if(!err) {
				
				  console.log('Updated');
				  return res.send({ status: 'OK', tshirt:tshirt });
			  } else {
				  
				  if(err.name == 'ValidationError') {
					  res.statusCode = 400;
					  res.send({ error: 'Validation error' });
				  } else {
					  res.statusCode = 500;
					  res.send({ error: 'Server error' });
				  }
				  
				  console.log('Internal error(%d): %s',res.statusCode,err.message);
			  }
			  
			  res.send(tshirt);
		  });
	  });
  };


  /**
   * Delete a tshirt by its ID.
   */
  deleteTshirt = function(req, res) {
	  
	  console.log("DELETE - /tshirt/:id");
	  
	  return Tshirt.findById(req.params.id, function(err, tshirt) {
		  
		  if(!tshirt) {
			  
			  res.statusCode = 404;
			  return res.send({ error: 'Not found' });
		  }
		  
		  return tshirt.remove(function(err) {
			  
			  if(!err) {
				  
				  console.log('Removed tshirt');
				  return res.send({ status: 'OK' });
			  } else {
				  
				  res.statusCode = 500;
				  console.log('Internal error(%d): %s',res.statusCode,err.message);
				  return res.send({ error: 'Server error' });
			  }
		  })
	  });
  }

  // bind these actions with the correct routes
  app.get('/tshirt', findAllTshirts);
  app.get('/tshirt/:id', findById);
  app.post('/tshirt', addTshirt);
  app.put('/tshirt/:id', updateTshirt);
  app.delete('/tshirt/:id', deleteTshirt);

}