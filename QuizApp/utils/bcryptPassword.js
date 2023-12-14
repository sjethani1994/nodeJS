var bcrypt = require('bcryptjs');

const salt =bcrypt.genSaltSync(10);
function bcryptPassword(password){
  return new Promise((resolve,reject)=>{
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
             if(err){
                reject(err)
             }
             resolve(hash)
        });
    });
  })
}

module.exports=bcryptPassword;