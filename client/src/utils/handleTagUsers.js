import axios from "axios";


export const handleInput = ({e, content, setContent, tagging, setTagging, kw,
    setKw, setUsers, tags, setTags}) => {
    
    setContent(e.target.value);
    if(!e.target.value){
        setTagging(null);
        setKw("");
        setUsers([]);
        setTags([]);
    }
    
    const current = e.target.selectionStart;
    const changeLen = e.target.value.length - content.length;
    updateTags(tags, current, changeLen);
    
    if(e.nativeEvent.inputType === "deleteContentBackward"){
        // changeLen will be < 0
        if(content[current - changeLen - 1] === '@'){
            setTagging(null);
            setKw("");
            setUsers([]);
        }
    }
    
    
    if(tagging !== null){
        if((!e.nativeEvent.data && e.nativeEvent.inputType !== "deleteContentBackward")
        || (e.nativeEvent.data === ' ' && current === e.target.value.length)
        || kw.length >= 10 || tagging + kw.length + 2 < current || current <= tagging){
            setTagging(null);
            setKw("");
            setUsers([]);
        }
        else{
            let newKw = null;
            if(e.nativeEvent.data === ' ')
                newKw = kw;
            else
                newKw = e.nativeEvent.data 
                ? kw.slice(0, current - tagging - 2) + e.nativeEvent.data + kw.slice(current - tagging - 2, kw.length)
                : kw.slice(0, current - tagging - 1) 
                + kw.slice(current - tagging - 1 - changeLen, kw.length);
            // kw.slice(0, current - tagging - 2) + e.nativeEvent.data + kw.slice(current - tagging - 2, kw.length)
            if(newKw.trim()){
                axios.get(`api/users/search/knowns?kw=${newKw}`).then(res => {
                    setUsers(res.data.users);
                });
            }

            setKw(newKw);
        }
    }

    if(e.nativeEvent.data === '@'){
        axios.get(`api/users/search/knowns?kw=@`).then(res => {
            setUsers(res.data.users);
        });
        setTagging(current - 1);
        setKw("");
    }
}



export const updateTags = (tags, current, changeLen) => {
    //Insert more text (can be past a block of text)
    if(changeLen > 0){
        const target = current - changeLen;
        
        tags.forEach(tag => {
            if(!tag.userId){

            }
                
            else if(tag.start >= target){
                tag.start += changeLen;
                tag.end += changeLen;
            }
            else if(target <= tag.end)
                tag.userId = null;
        });
    }

    //Remove text (can be remove a block of text)
    else{
        const start = current - 1;
        const end = start - changeLen -1;  //changLen < 0

        tags.forEach(tag => {
            if(!tag.userId){

            }
                
            else if(end < tag.start - 1){
                tag.start += changeLen;  //changLen < 0
                tag.end += changeLen;
            }
            else if(start < tag.end)
                tag.userId = null;
        });
    }
}