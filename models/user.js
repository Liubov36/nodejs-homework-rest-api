const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { handleSchemaValidationErrors } = require('../helpers');

const userSchema = new Schema(
  {
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ['starter', 'pro', 'business'],
        default: 'starter',
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post('save', handleSchemaValidationErrors);

userSchema.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
  
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const joiSignupSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().required(),
});
  
const joiLoginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().required(),
});

const schemas = {
  joiSignupSchema,
  joiLoginSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};