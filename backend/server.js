//module
const express = require("express");
const bodyParser = require("body-parser");

const db = require('./db');
  
//express
const app = express();

//bodyparser: json 형태로 오는 요청의 본문 해석
app.use(bodyParser.json());

//테이블 생성
// db.pool.query(`CREATE TABLE lists (
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)    
// )`, (err, results, fileds) => {
//     console.logt('results', results);
// });

//db lists 테이블에 있는 모든 데이터를 프론트 서버에 보내줌
app.get('/api/values', function(req, res) {
    //db에서 모든 정보를 가져옴
    db.pool.query(`SELECT * FROM lists;`, 
        (err, results, fileds) => {
            if (err)
                return res.status(500).send(err);
            else 
                return res.json(results);
        });
});

//클라이언트에서 입력한 값을 db lists 테이블에 입력
app.post('/api/value', function(req, res, next) {
    //데이터베이스에 값 넣어주기
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
        (err, results, fileds) => {
            if (err)
                return res.status(500).send(err);
            else
                return res.json({success: true, value: req.body.value});
        });
});

app.listen(5000, () => {
    console.log("5000번 포트에 애플리케이션 실행");
});