

//start import model Contact
import Contact from '../model/contactModal';
import _ from 'lodash';



//start add Contact 
export const newById = (req,res,next,id) =>{
  Contact.findById(id).exec((err,contact)=>{
    if(err || !contact) {
      res.status(400).json({
        error : 'error'
      })
    }
    req.contact = contact
    next()
  })
}
export const addContact = (req,res,next) =>{
  const contact = new Contact(req.body)
  contact.save((err,contact)=>{
    if(err){
      res.status(400).json({
        err : "thêm bài viết không thành công"
      })
    }
    res.status(200).json(
      contact
    )
  })
}

//end add Contact

//start show detail Contactr




//start delete Contact 

export const deleteContact = (req,res,next) =>{
  const contact = req.contact
  contact.remove((err,db)=>{
    if(err){
      res.json({
        error : "xoá không thành công"
      })
    }
    res.json({
      db,
      message : `xoá thành công sản phẩm ${db.name}`
    })
  })
}

//end delete Contact

//start edit Contact
export const editContact = (req,res,next) =>{
  let contact = _.assignIn(req.Contact,req.body);
  contact.save((err, db) => {
    if (err) {
      console.log(err.message)
     return res.status(400).json({
        error: "Cập nhật sản phẩm không thành công",
      });
    } else {
      res.json({
        message: "Sửa sản phẩm thành công",
      });
    }
  });
}
//end edit Contact



//start show list Contact
export const showListContact = (req,res,next) =>{
    Contact.find({})
    .then(Contact => {
      Contact = Contact.map(Contact => Contact.toObject())
      res.json(Contact)
    }
    )
    .catch(next)
        
}

//end show list Contact


//start show detail 
export const ContactDetail = (req, res, next) => {
 return res.json(req.Contact)
};