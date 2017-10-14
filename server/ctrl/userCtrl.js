module.exports = {
    //CRUD - Create - Read - Update - Destory
    // POST - PUT - GET - DELETE
    post_match: (req,res) => {
        const db = req.app.get('db');
        const { gender, matchID, ID, SwipeMatch } = req.body
        // console.log(gender, matchID, ID, SwipeMatch);
        if(gender === '0') { 
            db.post_match_hers([matchID, ID, SwipeMatch]).then(()=>res.status('200').send()).catch(()=> res.status.send('404'));
        }
        if(gender === '1') {
            db.post_match_his([matchID, ID, SwipeMatch]).then(()=>res.status('200').send()).catch(()=> res.status.send('404'));
        }
    },
    post_rate: (req,res) => {
        const db = req.app.get('db');
        const { chick_id, dude_id, rating, room_id } = req.body;
        // console.log(chick_id, dude_id, rating, room_id);
        db.post_rate([chick_id, dude_id, rating]).then((response)=>{
            console.log('something');
            db.put_rating(['true', room_id]).then((response)=>console.log('this is it man',response));
            res.status('200').send(response)
        })
        .catch((error)=>res.status('404').send(error));
    },
    post_user: (req,res) => {
        const db = req.app.get('db');
        let { id, name, birthday, work, gender, picture } = req.body;
        
        console.log( 'id', id);
        function first(val) {
            val = val.split(' ')[0];
            return val;
          }
          
          name = first(name);
        // console.log(work[0].position.name, id);
        let newBirthday = new Date(birthday);
        let katkatAge = Math.floor(((Date.now() - newBirthday) / (31557600000)));
        // console.log(katkatAge);
        console.log('this is work', work);
        if (work) {
         work = work[0].employer.name;
        }
        else if (!work) { 
            work = null
        }
        if (gender === 'male') {
            gender = '1';
        }
        else {
            gender = '0';
        }
        // if(work) {
        //     works = work[0].position.name
        // }
        db.post_user([id, name, katkatAge, work, gender, picture.data.url]).then((user)=>res.status('200').send(user)).catch(()=> res.status('200').send());
    },
    post_message: (req,res) => {
        const db = req.app.get('db');
        let { room_id, user_id, created_at, message  } = req.body
        db.post_message([room_id, user_id, created_at, message]).then((response)=>res.status('200').send(response)).catch((error)=>res.status('404').send(error));
    },
    get_user_profile: (req,res) => {
        console.log('we are in the get_user_profile method');
        const db = req.app.get('db');
        const { id } = req.params;
        console.log('we are in the get_user_profile method', id);
        db.get_user_profile([id]).then((data)=>res.status('200').send(data)).catch((error) => res.status('404').send(error));
    },
    get_user_preferences: (req,res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        db.get_user_preferences([id]).then((data)=>res.status('200').send(data)).catch(()=> res.status('404').send());
    },
    get_shopping: (req,res) => {
        const db = req.app.get('db');
        let gender = req.params.gender;
        // console.log(gender);
        if(gender === '0') {
            db.get_dudes([gender]).then((data)=>{res.status('200').send(data) }).catch(()=> res.status('404').send());
        }
        if(gender === '1' ) {
            db.get_chicks([gender]).then((data)=>{res.status('200').send(data)}).catch(()=> res.status('404').send());
        }
    },
    get_rating: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;

        db.get_dudes_rating(id).then((data) => { res.status('200').send(data) }).catch(()=> res.status('404').send());
    },
    get_matches: (req,res) => {
        const db = req.app.get('db');
        const { id, gender } = req.params;
        if(gender === '1' ) { 
            db.get_his_matches([id]).then((data)=>{
                // console.log(data);
                res.status('200').send(data)}).catch(()=> res.status('404').send());
        }
        if(gender === '0') {
            // console.log('did i make it here?', id)
            db.get_her_matches([id]).then((data)=>{
                // console.log('did i make it here?w')
                console.log(data);
                res.status('200').send(data)}).catch(()=> res.status('404').send());
        }
    },
    get_filtered: (req,res) => {
        const db = req.app.get('db');
        const { id, gender } = req.params;
        if(gender === '1') {
            db.get_his_filtered([id]).then((data)=>{
                let DataIDs = [];
                data.map((x)=> DataIDs.push(x.chick_id));
                res.status('200').send(DataIDs)}).catch((error)=>res.status('404').send(error));
        }
        if(gender === '0') {
            db.get_her_filtered([id]).then((data)=>{
                let DataID = [];
                data.map((x)=> DataID.push(x.dude_id));
                // console.log(DataID);
                res.status('200').send(DataID)}).catch((error)=>{
                    // console.log('error',error);
                    res.status('404').send(error)});
        }
    },
    get_prematch: (req,res) => {
        const db = req.app.get('db');
        let { id, gender } = req.params;
        // console.log(id, gender);
        if(gender === '1') {
            db.get_his_prematch([id]).then((data)=>{
                let TheDataX = [];
                data.map((x)=> TheDataX.push(x.chick_id));
                // console.log(DataID);
                res.status('200').send(TheDataX)}).catch((error)=>res.status('404').send(error));
        }
        if(gender === '0') {
            db.get_her_prematch([id]).then((data)=>{
                // console.log(data);
                let TheDataY = [];
                data.map((x)=> TheDataY.push(x.dude_id));
                // console.log(TheDataY, 'hello?');
                res.status('200').send(TheDataY)}).catch((error)=>res.status('404').send(error));
        }

    },
    get_message: (req,res) => {
        const db = req.app.get('db');
        let { room_id } = req.params;
        console.log(room_id);
        db.get_message([room_id]).then((response)=>{
            console.log('this is response for get_message', response);
            res.status('200').send(response)}).catch((error)=>res.status('404').send(error));
    },
    put_user_profile: (req,res) => {
        const db = req.app.get('db');
        const { facebook_auth_id , first_name, school, occupation, location, gender, age, facebook_pic, general_bio } = req.body;
        db.put_user_profile([facebook_auth_id , first_name, school, occupation, location, gender, age, facebook_pic, general_bio]).then((data)=>res.status('200').send(data)).catch(()=> res.status('404').send());
    },
    put_user_pics: (req,res) => {
                const db = req.app.get('db');
                const { facebook_auth_id, photo1, photo2, photo3, photo4 } = req.body;
                
                if (photo1) {
                    console.log('1 ',facebook_auth_id, photo1);
                    db.put_user_pics([facebook_auth_id , photo1]).then((data)=>res.status('200').send(data)).catch(()=> res.status('404').send());
                }
                else if(photo2){
                    console.log('2 ',facebook_auth_id, photo2);
                    db.put_user_pics2([facebook_auth_id , photo2]).then((data)=>res.status('200').send(data)).catch(()=> res.status('404').send());
                }
                else if(photo3){
                    console.log('3 ',facebook_auth_id, photo3);
                    db.put_user_pics3([facebook_auth_id , photo3]).then((data)=>res.status('200').send(data)).catch(()=> res.status('404').send());
                }
                else if (photo4){
                    console.log('4 ',facebook_auth_id, photo4);
                    db.put_user_pics4([facebook_auth_id , photo4]).then((data)=>res.status('200').send(data)).catch(()=> res.status('404').send());
                }      
            },
    put_user_bio: (req,res) => {
        const db = req.app.get('db');
        const { facebook_auth_id , general_bio, occupation } = req.body;
        db.put_user_bio([facebook_auth_id , general_bio, occupation]).then((data)=>res.status('200').send(data)).catch(()=> res.status('404').send());
    },
    put_user_preferences: (req,res) => {
        const db = req.app.get('db');
        const { facebook_auth_id, dist_min, dist_max, age_min, age_max } = req.params;
        db.put_user_preferences([facebook_auth_id, dist_min, dist_max, age_min, age_max]).then((data)=>res.status('200').send(data)).catch(()=> res.status('404').send());
    },
    put_match: (req,res) => {
        const db = req.app.get('db');
        const { matchedID, id, gender, SwipeMatch } = req.params;
        // console.log(matchedID, id, gender, SwipeMatch);
        if(gender === '1') { 
            db.put_match_his([matchedID, id, SwipeMatch]).then((data)=>res.status('200').send(data)).catch(()=> res.status.send('404'));
        }
        if(gender === '0') {
            db.put_match_hers([matchedID, id, SwipeMatch]).then((data)=>res.status('200').send(data)).catch(()=> res.status.send('404'));
        }
    },
    delete_match: (req,res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        db.delete_match([id]).then((data)=>res.status('200').send(data)).catch(()=> res.status('404').send());
    },
    delete_user_account: (req,res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        db.get_user_profile([id]).then(()=>res.status('200').send()).catch(()=> res.status('404').send());
    },
    
}