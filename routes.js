var applicationRoutes = {
  '/': {
	 render: 'Index'
  },
  '/home': {
	 render: 'Welcome to home page'
  },
  '/about': 'Middle Earth Jornal is a company who produces news about middle earth and the adventures in the land of Sauron.',
  '/contact': 'React & Routing',
  '/news': {
	  url: 'news/news.js'
  },
  '/login': {
	  url: 'login/login.js',
	  css: 'login/login.css'
  },
  '/news/{id}': {
	  url: 'news/newsView.js'
  },
  '/news/{id}/author': {
	  url: 'news/newsAuthor.js'
  },
  '/pages/transfer': {
	  url: 'pages/transfer/transfer.js'
  },
  '/pages/transfer/review': {
	  url: 'pages/transfer/transferReview.js'
  },
  '/pages/transfer/complete': {
	  url: 'pages/transfer/transferComplete.js'
  }
};