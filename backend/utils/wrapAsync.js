 export default (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next)
        .catch((err)=>{
            if(err.message.includes("E11000 duplicate key error collection")){
                err.message="You have already posted your story, so you cannot create another one."
              }

              if(err.message.includes("Cast to ObjectId failed for value")){
                err.message="You have done some changes in url click on profile setting to see your profile."
              }
              if(err){
                err.statusCode=400;
              }
            next(err)
        })
    }
}
