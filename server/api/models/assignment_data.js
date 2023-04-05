module.exports = (sequelize, DataTypes) => {
    const assignment_data = sequelize.define("assignment_data", {
        Timestamp: {
            type: DataTypes.INTEGER,
        },
        "Y-B(KV)" : {
            type: DataTypes.DOUBLE,
        },
        "R-Y(KV)": {
            type: DataTypes.DOUBLE,
        },
        "B-R (KV)": {
            type: DataTypes.DOUBLE,
        },
        "APPARENT POWER (MVA)": {
            type: DataTypes.DOUBLE,
        },
        "REACTIVE POWER (MVAR)": {
            type: DataTypes.DOUBLE,
        },
        "ACTIVE ENERGY (MWH)": {
            type: DataTypes.DOUBLE,
        },
        "POWER FACTOR": {
            type: DataTypes.INTEGER,
        },
        "ACTIVE POWER (MW)": {
            type: DataTypes.DOUBLE,
        },
        "Y (A)": {
            type: DataTypes.DOUBLE,
        },
        "R(A)": {
            type: DataTypes.DOUBLE,
        },
        "B(A)": {
            type: DataTypes.DOUBLE,
        },
        "FREQUENCY(HZ)": {
            type: DataTypes.DOUBLE,
        },
    },{
        timestamps: true,
        freezeTableName: true,
    }
    );

    assignment_data.sync();
    return assignment_data;
};