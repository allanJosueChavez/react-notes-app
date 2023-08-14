function NewNote(){
    return(
        <div className="note">
            <input type="text" placeholder="Title" />
            <textarea placeholder="Take a note..." rows="3" />
            <button>
                <AddIcon />
            </button>
        </div>
    );
}

export default NewNote; 