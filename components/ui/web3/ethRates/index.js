import { useEthPrice } from "@components/hooks/useEthPrice"
import Image from "next/legacy/image"

export default function EthRates() {

  const {eth} = useEthPrice()

  return (
    <div className="grid grid-cols-4 ">
      <div className="flex flex-1 items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md">
          <div className="flex items-center">
            <Image
              layout="fixed"
              height="35"
              width="35"
              alt="ether"
              src="/ether.png"
            />
            <span className="text-2xl font-bold">
               = {eth.data}$
            </span>
          </div>
          <p className="text-xl text-gray-500">Current eth Price</p>
        </div>
      </div>
      <div className="flex flex-1 items-stretch text-center">
        <div className="p-10 border drop-shadow rounded-md">
          <div className="flex items-center">
            <span className="text-2xl font-bold"> 
              {eth.perItem}
            </span>
            <Image
              layout="fixed"
              height="35"
              alt="ether"
              width="35"
              src="/ether.png"
            />
            <span className="text-2xl font-bold">
              = 15$
            </span>
          </div>
          <p className="text-xl text-gray-500">Price per course</p>
        </div>
        </div>
    </div>
  )
}