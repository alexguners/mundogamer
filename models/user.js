var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local              : {
        nome           : String,
        email          : String,
        password       : String,
        tipo           : String,
        origin         : String,
        credits        : Number,
        descricao      : String,
        user_site      : String,
        user_facebook  : String,
        user_instagram : String,
        user_twitter   : String,
        user_youtube   : String,
        user_psnid     : String,
        user_xboxlive  : String,
        user_nintendoid  : String,
        user_origin    : String,
        user_steam     : String,
        created_at     : {type: Date}

    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        username     : String,
        profileUrl   : String,
        gender       : String,
        location     : String,
        locale       : String,
        birthday     : String,
        age_range    : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    noticias : [{ type: mongoose.Schema.ObjectId, ref: 'Noticia' }]

},{ collection: 'users' });

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);