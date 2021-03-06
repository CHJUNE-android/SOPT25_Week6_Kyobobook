//{"category": "library"} req로 오면 home의 book.json res하고 send.("ok")
const express = require('express');
const router = express.Router();
const statusCode = require('../../../module/statusCode');
const responseMessage = require('../../../module/responseMessage');
const authUtil = require('../../../module/authUtil');
const Booklike = require('../../../model/booklike');

// 취향이 비슷한 사람들 조회하기
router.get('/:username', async(req,res)=>{
    const {username} = req.params;
    console.log({username});

    // username 값이 들어왔는지 확인
    if(!username){
        res.status(statusCode.BAD_REQUEST).send(authUtil.successFalse(responseMessage.NULL_VALUE));
    }
    
    // 값 불러오기
    try{
        const {code,json} = await Booklike.selectAll({username});
        res.status(code).send(json);
    }catch(err){
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(authUtil.successFalse(responseMessage.INTERNAL_SERVER_ERROR));    }
});

module.exports = router;
