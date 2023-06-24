import React from "react";
import styles from "../../styles/Components.module.scss";
import { className } from "../../utils/className";
import { Configuration,OpenAIApi } from "openai";

export function TextAreaInput(
  props: React.PropsWithChildren<{
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
  }>
) {
  const ref = React.createRef<HTMLTextAreaElement>();
  const [message, setMessage] = React.useState('')
  const [chat,setChat] : any = React.useState([])
  const configuration = new Configuration({
    organization: process.env.organizationKey,
    apiKey: process.env.openAiApiKey,
  })
  const openai = new OpenAIApi(configuration )
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      props.onChange?.(e.target.value);
    },
    [props.onChange]
  );
  const questionFormSubmitted = (e: any) => {
    if (e.key === 'Enter') {
      setMessage(e.target.value)
    }
  }
  const onsubmit = async (e: any,message:any) => {
    e.preventDefault()
    try{
      console.log(e)
      let mesge = message 
      let msgs : any = chat
      msgs.push({"role":'user',content:message})
      setChat(msgs)
      setMessage("")
      const completion : any = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: mesge,
          },
          ...chat,
        ],
      });
      // console.log(completion?.data?.choices[0]?.message?.content)
      // msgs.push(completion?.data?.choices[0]?.message)
      // setChat(msgs)
      setChat([...chat,completion['data']['choices'][0]['message']])
      console.log(msgs)
      console.log(chat)
    }catch(err){
      console.log(err)
    }
  
  }
  return (
    <div
      className={className(
        styles.textAreaInput,
        props.disabled && styles.disabled
      )}
    >
      <div className={styles.label}>{props.label}</div>
      <div style={{
        height: '100%',
        overflowY:'scroll'
      }}>

        {chat && chat.length >0
        ?chat.map((chats:any,index:any)=>{
          if(chats['role'] == 'user'){
            return(
              <div key={index} style={{
                paddingRight:'50px',
                paddingLeft:'50px',
                paddingTop:'20px',
                marginBottom:'50px',
              width:'100%'
            }}>
              <p style={{
                float:'right'
              }}>
              <span style={{
                backgroundColor: 'black',
                padding: '15px',
                borderRadius: '30px',
                color: 'white',
                width: 'auto',
                display: 'block'
              }}>{chats['content']}</span>
              </p>
            </div>
            )
          }else{
            return(
              <div key={index} style={{
                paddingRight:'50px',
                paddingLeft:'50px',
               
               width:'100%'
             }}>
               <p>
               <span style={{
                 backgroundColor: 'black',
                 padding: '15px',
                 borderRadius: '30px',
                 color: 'white',
                 width: 'auto',
                display: 'block'
               }}>{chats['content']}</span> 
               </p>
             </div>
            )
          }
        }): ""

        }
        
        


     
        
      </div>

      <form onSubmit={(e)=>onsubmit(e,message)}>

        <div style={{
          paddingRight: '20px',
          paddingLeft: '20px',
          paddingBottom: '20px',
          position:'absolute',
          bottom:'0',
          width:'100%'
        }}>
          <input type="text" style={{ width: '100%', padding: '10px', borderRadius: '10px' }}
            placeholder="Ask Your Question"  value={message} onChange={(e)=>setMessage(e.target.value)} />
        </div>
      </form>


    </div>
  );
}
