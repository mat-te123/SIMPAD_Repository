

function AddText({block}) {
    return(
        <div className="w-full">
            <input type="text" name="text content" id="textcontent" placeholder="Add a paragraph here"
            onChange={(e) => block.block_content.text = e.target.value}
            className="w-full text-2xl " />
        </div>
    );
    
}

export {AddText};