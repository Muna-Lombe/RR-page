
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';
import db  from '../db';

const local = 'http://localhost:3000';
const wildcard = '*'
const origin = local;
const Watchlist = {
    /**
   * Create A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
    
    async create(req, res){
        res.set('Access-Control-Allow-Origin', origin);
        const text = `INSERT INTO
                    watchlists(
                        id ,
                        title,
                        bookmarked_movies,
                        created_date,
                        modified_date
                    )
                    VALUES($1, $2, $3, $4, $5)
                    returning *`;
        const values = [
            uuidv4(),
            req.body.title,
            req.body.bookmarked_movies ? req.body.bookmarked_movies : [],
            moment(new Date()),
            moment(new Date())
        ];

        try {
            const {rows} =await db.query(text, values);
            return res.status(200).send(rows)

        }catch(err) {
            console.log(err)
            return res.status(400).send(error);
        }
    },
    /**
     * Get All Reflection
     * @param {object} req 
     * @param {object} res 
     * @returns {object} reflections array
     */
    async getAll(req,res){
        const findAllQuery = 'SELECT * FROM watchlists';
        res.set('Access-Control-Allow-Origin', origin);
        try {
          const { rows, rowCount } = await db.query(findAllQuery);
          return res.status(200).send({ rows, rowCount });
        } catch(error) {
          return res.status(400).send(error);
        }  

    },
    /**
     * Get A Reflection
     * @param {object} req 
     * @param {object} res
     * @returns {object} reflection object
     */
    async getOne(req, res) {
        const text = 'SELECT * FROM watchlists WHERE id = $1';
        res.set('Access-Control-Allow-Origin', origin);
        try {
            const { rows } = await db.query(text, [req.params.id]);
            if (!rows[0]) {
            return res.status(404).send({'message': 'watchlist not found'});
            }
            return res.status(200).send(rows[0]);
        } catch(error) {
            return res.status(400).send(error)
        }
    },
    /**
     * Update A Reflection
     * @param {object} req 
     * @param {object} res 
     * @returns {object} updated reflection
     */
    async update(req, res) {
        res.set('Access-Control-Allow-Origin', origin);

        const findOneQuery = 'SELECT * FROM watchlists WHERE id=$1';
        const updateOneQuery =`UPDATE watchlists
            SET title=$1,modified_date=$2
            WHERE id=$3 returning *`;
         
        const updateMoviesQuery = `UPDATE watchlists
                                    SET bookmarked_movies = array_append(bookmarked_movies,$1)
                                    WHERE id=$2
                                    returning *`
        const reqData = req.body;
        const resData = [];

        //cleans req.Body to make if easier to manipulate
        const keys = Object.keys(reqData);
        const data = [];
        // const resBody = 
        keys.map((k)=>{
            data.push(reqData[k])
        })
        
        // tests if data has been cleaned
        console.log(data)
        
        // seperate function to update only the bookmarked movies
        async function updateMovies(m,id,rows){
            try {
                const updateMoviesValues = [ m || [rows[0].bookmarked_movies], id];
                const data = await db.query(updateMoviesQuery, updateMoviesValues);
                const response = await data;
                console.log('updatemovies', response.rows[0])
                return response.rows[0];
            } catch (error) {
                console.log(error);
                return -1;
            }
        }

        // seperate function that updates all the fields
        async function fetchData(i,rows){
            console.log('Updating fields....')
            try {
                
                const values = [
                i.title || rows[0].title,
                moment(new Date()),
                i.id
                ];
                const data =  await db.query(updateOneQuery, values);
                const res = await data;
                console.log('fetchdata',res)
                return res.rows[0];
            } catch(err) {
                console.log(err)
                return res.status(400).send(err);
            }
        };

        // runs the update functions
        for (let i = 0; i < data.length; i++) {
            const {rows} =await db.query(findOneQuery, [data[i].id]);
            

            if(!rows[0]) {
                return res.status(404).send({'message': 'watchlist not found'});
                console.log('reflection not found')
            }
            console.log(rows[0])
            const dataRes = await fetchData(data[i],rows)
            resData.push(dataRes);

            if(data[i].bookmarked_movies.length > 0){
                const movies = data[i].bookmarked_movies
                for (let mi = 0; mi < movies.length; mi++) {
                    const updateMoviesres = await updateMovies(movies[mi],data[i].id,rows)
                    resData.push(fetchData(updateMoviesres)) 
                }     
            }
        }
        console.log(resData)
        return res.status(200).send(JSON.stringify(resData))
        
    },
    /**
     * Delete A Reflection
     * @param {object} req 
     * @param {object} res 
     * @returns {void} return statuc code 204 
     */
    async delete(req, res) {
        const deleteQuery = 'DELETE FROM watchlists WHERE id=$1 returning *';
        res.set('Access-Control-Allow-Origin', '');
        try {
            const { rows } = await db.query(deleteQuery, [req.params.id]);
            if(!rows[0]) {
            return res.status(404).send({'message': 'watchlist not found'});
            }
            return res.status(204).send({ 'message': 'deleted!' });
        } catch(error) {
            return res.status(400).send(error);
        }
    }
}
export default Watchlist;