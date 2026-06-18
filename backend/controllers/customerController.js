const {sql} = require("../config/db");



const addCustomer = async(req,res)=>{


    try{


        const {Name, Mobile, Address, Email} = req.body;


        await sql.query`

        INSERT INTO Customers
        (
            Name,
            Mobile,
            Address,
            Email
        )

        VALUES
        (
            ${Name},
            ${Mobile},
            ${Address},
            ${Email}
        )

        `;


        res.json({

            message:"Customer Added Successfully"

        });



    }
    catch(error){

        res.status(500).json(error);

    }

}




const getCustomers = async(req,res)=>{


    try{


        const result = await sql.query`

        SELECT * FROM Customers

        `;


        res.json(result.recordset);



    }
    catch(error){

        res.status(500).json(error);

    }


}



module.exports={

    addCustomer,

    getCustomers

}