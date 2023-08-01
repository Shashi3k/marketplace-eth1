

import { useWeb3 } from "@components/providers"
import Link from "next/link"
import {Button } from "@components/ui/common"
import { useAccount } from "@components/hooks/web3/useAccount"
import { useRouter } from "next/router"



export default function Navbar() {
  const { connect, isWeb3Loaded, isLoading } = useWeb3()
  const {account}=useAccount()
  const {pathname}=useRouter()
  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between">
            <div>
              <Link href="#" legacyBehavior>
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">Home</a>
              </Link>
              <Link href="/marketplace" legacyBehavior>
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">Marketplace</a>
              </Link>
              <Link href="#" legacyBehavior>
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">Blogs</a>
              </Link>
            </div>
            <div>
              <Link href="#" legacyBehavior>
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">Whishlist</a>
              </Link>
              { isLoading ?
              <Button disabled={true} onClick={connect}
                >Loading......
              </Button>:
               isWeb3Loaded ?
               account.data?
              <Button onClick={connect}
              hoverable={false}
                >Hi there {account.isAdmin ? "Admin":""}
              </Button>:
              <Button onClick={connect}>
                Connect
              </Button>:
              <Button onClick={()=>window.open("https://metamask.io/download/","_blank")}
                >Install Metamask
              </Button>
                }
            </div>
          </div>
        </nav>
        
      </div>
      {(account.data
      && !pathname.includes("/marketplace"))
      &&
          <div className="flex justify-end rounded-md">
          <Button className="pt-2 " hoverable={false}  >
          {account.data}
        </Button>
        </div>
        }
    </section>
  )
}
