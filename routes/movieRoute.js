const router=require('express').Router();
const authMiddleware=require('../middleware/authMiddleware');
const db=require('../models');
const { QueryTypes, where } = require('sequelize');


router.post("/add-movie",authMiddleware, async (req, res) => {
    try {
        let UserId = req.body.UserId
        var {MovieName,Rating,CastList,Genre,ReleaseDate}=req.body;
        const movie=await db.Movie.findOrCreate({
            where: {
                MovieName,
                UserId
            },
            defaults: {
                MovieName,Rating,Genre,ReleaseDate
            }
        })
        let MovieId=movie[0].MovieId
        let castNameResult,moviecastrelation
        for(let i=0; i<CastList.length; i++){
            castNameResult=await db.Cast.findOrCreate({
                where: {
                    CastName : CastList[i].CastName
                },
                defaults: {
                    CastName : CastList[i].CastName
                },
            })
            let CastId=castNameResult[0].CastId
            moviecastrelation=await db.MovieCastJunction.findOrCreate({
                where: {
                    MovieId,
                    CastId
                },
                defaults: {
                    MovieId,CastId
                },
            })
        }
        res.send({
            message: 'Movie inserted Successfully',
            success: true,
            data : movie
        })
    } catch(err) {
        console.log('err :',err)
        res.send({
            message: err,
            success: false,
            data: null,
            token : null
        })
  }
});


router.post('/show-movies', authMiddleware, async (req, res) => {
    try {
        let UserId=req.body.UserId
        let resultdata=await db.sequelize.query(`
            select m.MovieId,m.UserId, m.MovieName,m.Rating,m.Genre,m.ReleaseDate,c.CastName,c.CastId
            from movies m join moviecastjunctions mcj on m.MovieId = mcj.MovieId
            join casts c on mcj.CastId = c.CastId where m.UserId = ${UserId};`,
            {type: QueryTypes.SELECT});
        console.log('resultData : ', resultdata)
        let temp
        let result=resultdata.reduce((prev, curr) => {
            if(prev[curr['MovieId']]) {
                temp=prev[curr['MovieId']]
                temp.CastList.push([curr.CastName, curr.CastId])
            } else {
                temp=prev[curr['MovieId']]=curr
                temp.CastList = []
                temp.CastList.push([temp.CastName, temp.CastId])
            }
            return prev
        }, {})
        console.log('result : ',result);
        var result1=Object.keys(result).map((key) => [result[key]]);
        console.log('result1 :',result1)
        res.send({
            message: "Movie data fetched Successfully",
            success: true,
            data: result1
        })
    } catch (error) {
        console.log('err :',error)
        res.send({
            message: err,
            success: false,
            data: null,
            token : null
        })
    }
})

router.post('/update-movie', authMiddleware, async (req, res) => {
    try {
        const {MovieId, UserId, CastList, Rating, Genre, MovieName, ReleaseDate}=req.body
        console.log('cast :', CastList);
        console.log('MovieId :', MovieId)
        console.log('UserId :', UserId);
        console.log('Ratung : ', Rating)
        console.log('Genre :', Genre);
        console.log('MovieName :', MovieName)
        console.log('ReleaseDdata :',ReleaseDate);
        const movieUpdated=await db.Movie.update({
            MovieName,
            Rating,
            Genre,
            ReleaseDate
        }, {
            where: {
                MovieId:MovieId,
                UserId:UserId
            }   
        })
        //await movieUpdated[0].save()
        await db.MovieCastJunction.destroy({
            where: {
                MovieId
            }
        })
         for(let i=0; i<CastList.length; i++){
            castNameResult=await db.Cast.findOrCreate({
                where: {
                    CastName : CastList[i].CastName
                },
                defaults: {
                    CastName : CastList[i].CastName
                },
            })
            let CastId=castNameResult[0].CastId
            moviecastrelation=await db.MovieCastJunction.findOrCreate({
                where: {
                    MovieId,
                    CastId
                },
                defaults: {
                    MovieId,CastId
                },
            })
        }
        res.send({
            message: 'Movie updated Successfully',
            success: true,
            data : null
        })
    } catch (error) {
        console.log('err :',error)
        res.send({
            message: error,
            success: false,
            data: null,
            token : null
        })
    }
})


router.post('/delete-movie', authMiddleware, async (req, res) => {
    try {
        let {MovieId,UserId,MovieName} = req.body
        await db.Movie.destroy({
            where: {
                MovieId,
                UserId,
                MovieName
            }
        })
        res.send({
            message: 'Movie deleted Successfully',
            success: true,
            data : null
        })   
    } catch (error) {
        res.send({
            message: error,
            success: false,
            data : null,
        })
    }
})


module.exports=router;