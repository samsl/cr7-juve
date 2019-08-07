const env = process.env.NODE_ENV || 'development';

const config={
	production:{
		db:"mongodb://sam:test123@ds239682.mlab.com:39682/cr7"
	},
	development:{
		db:"mongodb://localhost:28008/cr7"
	}
};
console.log(env);
module.exports = config[env]; 