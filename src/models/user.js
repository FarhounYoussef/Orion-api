import bcrypt from 'bcrypt';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [7, 42],
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ['Admin','User'],
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }); 
  
  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = function() {
    const saltRounds = 10;
    return bcrypt.hash(this.password, saltRounds);
  };

  User.prototype.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};

export default user;
