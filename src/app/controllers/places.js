const db = require("../../config/db")

module.exports = {
    index(req,res) {
        return res.render("index.html")
    },
    create(req,res){
        return res.render("create-point.html")
    },
    post(req,res){
        const data = req.body
        
        const query = `INSERT INTO place (
            image,
            name,
            address,
            address2,
            state,
            city,
            items,
            email,
            whatsapp
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9
        )
        
        RETURNING id`

        console.log(data.city[0])
    
        const values = [
            data.image,
            data.name,
            data.address,
            data.address2,
            data.state,
            data.city[0],
            data.items,
            data.email,
            data.whatsapp
        ]
    
        db.query(query, values, function(err, results){
            if (err) throw `Database Error! ${err}`
    
            return res.render("create-point.html", {confirm: true})
        })
    },
    search(req,res){
        const search = req.query.search
    
        if(search == ""){
            return res.render("search-results.html", {total: 0}) 
        }
    
        db.query(`SELECT * FROM place WHERE city ILIKE '%${search}%'`, function(err, results){
            if (err) throw `Database Error! ${err}`
            const total = results.rows.length
            return res.render("search-results.html", {places: results.rows, total}) 
        })
    }
}