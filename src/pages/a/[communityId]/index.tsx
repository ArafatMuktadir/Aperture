import { Community } from "@/src/atoms/communitiesAtom"
import Header from "@/src/components/Community/Header"
import NotFound from "@/src/components/Community/NotFound"
import PageContent from "@/src/components/layout/PageContent"
import { firestore } from "@/src/firebase/clientApp"
import { doc ,getDoc} from "firebase/firestore"
import { GetServerSideProps } from "next"
import React from "react"
import safeJsonStringify from "safe-json-stringify"

type CommunityPageProps={
    communityData:Community
}

const CommunityPage: React.FC<CommunityPageProps>=({communityData}) =>{

    if(!communityData){
        return <NotFound/>
    }
    return (
    <>
        <Header communityData={communityData}/>
        <PageContent>
            <>
                <div>LHS</div>
            </>
            <>
                <div>RHS</div>
            </>
        </PageContent>
    </>
    )
}

    


export async function getServerSideProps(context:GetServerSideProps){
    try{
        const communityDocRef=doc(firestore,"communities",context.query.communityId as string)
    
        const communityDoc=await getDoc(communityDocRef)

        return{
            props:{
                communityData:communityDoc.exists()
                ? JSON.parse(
                    safeJsonStringify({ id:communityDoc.id, ...communityDoc.data()})
                )
                : "",
            }
        }
    
    } catch (error){
        console.log("getServerSideProps Error", error)

    }
}



export default CommunityPage

