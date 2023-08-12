import { useEthPrice } from "@components/hooks/useEthPrice";
import { Button, Modal } from "@components/ui/common";
import { useEffect, useState } from "react";

const defaultOrder=
  {
    price:"",
    email:"",
    confirmationEmail:""
  }

  const _createFormState = ( isDisabled=false , message ="")=>({isDisabled,message})

  const createFormState=({price,email,confirmationEmail,hasAgreedTOS})=>{
    if(isNaN(price) && price>=0){
      return _createFormState(true,"Price is not valid")
    }
    else if(confirmationEmail.length===0 || email.length===0){
      return _createFormState(true)
    }
    else if(confirmationEmail!=email){
      return _createFormState(true,"Emails are not matching")
    }
    else if (!hasAgreedTOS){
      return _createFormState(true,"You need to agree with terms of service in order to submit the form")
    }
    return _createFormState(false, "")
  }

export default function OrderModal({course,onClose,onSubmit}) {
    const [isOpen, setIsOpen]=useState(false)
    const [order, setOrder]=useState(defaultOrder)
    const [enablePrice, setEnablePrice]=useState(false)
    const [hasAgreedTOS, setHasAgreedTOS]=useState(false)
    useEffect(()=>{
        if (!!course){
            setIsOpen(true)
            setOrder({
              ...defaultOrder,
              price:eth.perItem
            })
        }
    },[course])

    const closeModal=()=>{
        setIsOpen(false)
        setOrder(defaultOrder)
        setHasAgreedTOS(false)
        onClose()
    }

    const { eth }= useEthPrice()
    const FormState=createFormState(order, hasAgreedTOS)

  return (
    <Modal isOpen={isOpen}>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="mb-7 text-lg font-bold leading-6 text-gray-900 " id="modal-title">
                {course.title}
              </h3>
              <div className="mt-1 relative rounded-md">
                <div className="mb-1">
                    <label className="mb-2 font-bold">
                        Price(eth)
                    </label>
                    <div className="text-xs text-gray-700 flex">
                        <label className="flex item-center mr-2">
                            <input
                            checked={enablePrice}
                            onChange={({target:{checked}})=>{
                              setOrder({
                                ...order,
                                price:checked? order.price:eth.perItem
                              })
                              setEnablePrice(checked)
                            }}
                             type="checkbox"
                              className="form-checkbox" />
                        </label>
                        <span>Adjust Price - only when the price is not correct</span>
                    </div>
                    <input 
                    disabled={!enablePrice}
                    value={order.price}
                    onChange={({target:{value}})=>{
                      if(isNaN(value)){return;}
                      setOrder({
                        ...order,
                        price: value
                      })
                    }}
                type="text"
                name="price"
                id="price"
                className="disabled:opacity-50 w-80 mb-1 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7  p-4 sm:text-sm border-gray-300 rounded-md" />
                 <p className="text-xs text-gray-700">
                  Price will be verified at the time of the order. If the price will be lower, order can be declined (+- 2% slipage is allowed)</p>
              </div>
                    <div className="mt-2 relative rounded-md">
                        <div className="mb-1">
                            <label className="mb-2 font-bold">Email</label>
                        </div>
                        <input 
                            onChange={({target:{value}})=>{
                              setOrder({
                                ...order,
                                email:value.trim()
                              })

                            }}
                            type="email"
                            name="email"
                            id="email"
                            className="w-80  shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                            placeholder="xyz@gmail.com"
                        />
                        <p className="text-xs text-gray-700 mt-1">It&apos;s important to fill a correct email, otherwise the order cannot be verified. We are not storing your email anywhere</p>
                    </div>
                    <div className="my-2 relative rounded-md">
                        <div className="mb-1">
                            <label className="mb-2 font-bold">
                                Repeat Email
                            </label>
                        </div>
                        <input 
                        onChange={({target:{value}})=>{
                          setOrder({
                            ...order,
                            confirmationEmail:value.trim()
                          })
                        }}
                        type="email"
                        name="confirmationEmail"
                        id="confirmationEmail"
                        className="w-80 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                        placeholder="xyz@gmail.com"
                        />
                    </div>
                    <div className="text-xs text-gray-700 flex">
                <label className="flex items-center mr-2">
                  <input
                  checked={hasAgreedTOS}
                  onChange={({target:{checked}})=>
                          setHasAgreedTOS(checked)
                }
                    type="checkbox"
                    className="form-checkbox" />
                </label>
                <span>I accept Eincode &apos;terms of service&apos; and I agree that my order can be rejected in the case data provided above are not correct</span>
              </div>
            </div>
            {FormState.message && 
            <div className="p-4 my-3 text-yellow-700 bg-yellow-200 rounded-lg text-sm">
              {FormState.message}
            </div>
            }
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
        <div className=" pr-4 pb-5">
            <Button disabled={createFormState.isDisabled}
            onClick={()=>{
              onSubmit(order)
            }}>
                Submit
            </Button>
            <Button variant="red" onClick={closeModal}>
                Cancel
            </Button>
        </div>
        </div>
      </div>

    </Modal>
  )
}