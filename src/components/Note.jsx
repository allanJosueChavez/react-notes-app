function Note({ noteToOpen }) {
    return (
        <div className={'h-80  w-96'}>
      <div className="note rounded-lg shadow-lg bg-purple-200 mt-10  h-full">
        <h3>This is the CURRENT note SELECTED</h3>
        <h3 className="text-lg font-bold m-2 flex-grow">
              {noteToOpen?.title}
            </h3>

            <p className="text-gray-700">{noteToOpen?.description}</p>
      </div>
        </div>

    );
  }
  
  export default Note;
  