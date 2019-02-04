import React from 'react'


const ModalForm = ({classes}) => (
    <form className={classes.modalform}>
        <div className={classes.formcontrol}>
            <label htmlFor="title" className={classes.label}>Title</label>
            <input type="text" id="title" ref={titleEl} className={classes.input}></input>
        </div>
        <div className={classes.formcontrol}>
            <label htmlFor="price" className={classes.label}>Price</label>
            <input type="number" id="price" ref={priceEl} className={classes.input}></input>
        </div>
        <div className={classes.formcontrol}>
            <label className={classes.label} htmlFor="date" >Date</label>
            <input className={classes.input} type="datetime-local" id="date" ref={dateEl}></input>
        </div>
        <div className={classes.formcontrol}>
            <label className={classes.label} htmlFor="description" >Description</label>
            <textarea className={classes.input} id="description" rows="3" ref={descriptionEl}></textarea>
        </div>
    </form>
)

export default ModalForm