const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');

//Usurio seria o prof, essa bomba n ta finalizada, e não fiz a do agendamento
const Agendamento = sequelize.define('./agendamentoModel',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});


module.exports = Agendamento;
