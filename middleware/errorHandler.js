const errorHandler = (err, req, res, next) => {
    console.error('❌ Server Error:', err.stack);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err.message,
    });
  };
  
  module.exports = errorHandler;
  