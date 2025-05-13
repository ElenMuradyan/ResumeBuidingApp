// 'use client'

// import { formItemStyle, formStyles } from "@/styles/constants";
// import { Form } from "antd";
// import { Input } from "../ui/input";
// import MagicButton from "../ui/magic-button";
// import { useParams } from "next/navigation";
// import { forms } from "@/features/resume/formConstants";
// import { levelType } from "@/features/resume/types";

// export default function ResumeForm () {
//     const [ form ] = Form.useForm();
//     const { level } = useParams();
//     if (typeof level !== "string") return null;

//     const { onFieldsChange, onFinish, formItems } = forms[level as levelType];
//     return(
//         <div>
//             {
//                 typeof level === 'string' && <Form
//                 layout="vertical"
//                 form={form}
//                 style={formStyles}
//                 onFinish={onFinish}
//                 onFieldsChange={onFieldsChange}
//                 >
//                     {
//                         formItems.map((item, i) => {
//                             return(
//                                 <Form.Item
//                                 name={item.name}
//                                 rules={item.rules}
//                                 style={formItemStyle}
//                                 key={i}
//                             >
//                                 {item.input}
//                             </Form.Item>            
//                             )
//                         })
//                     }

//                 <div className="flex items-center justify-between space-x-4 w-[100%]">
//                     <MagicButton
//                     htmlType="submit"
//                     text='SIGN IN'
//                     // loading={loading}
//                     />
//                 </div>
//             </Form>
//             }
//         </div>
//     )
// }