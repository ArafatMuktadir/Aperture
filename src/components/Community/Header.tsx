import React from "react";
import { Box, Button, Flex, Icon, Text, Image } from "@chakra-ui/react";
import { GiAbstract020 } from "react-icons/gi";
import { Community } from "../../atoms/communitiesAtom";
import useCommunityData from "../../hooks/useCommunityData";

type HeaderProps = {
    communityData: Community;
  };

const Header: React.FC<HeaderProps> = ({ communityData }) => {
    
    const { communityStateValue, onJoinOrLeaveCommunity, loading}= useCommunityData()
    const isJoined=!!communityStateValue.mySnippets.find(
        (item)=> item.communityId=== communityData.id
    )
    return (
        <Flex direction="column" width="100%" height="146px">
          <Box height="50%" bg="orange.200" />
          <Flex justifyContent="center" bg="white" height="50%">
            <Flex width="95%" maxWidth="860px">
              {communityData.imageURL ? (
                <Image/>
              ) : (
                <Icon
                  as={GiAbstract020}
                  fontSize={60}
                  position="relative"
                  top={-3}
                  color="black"
                  border="5px solid white"
                  borderRadius="50%"
                />
              )}
              <Flex padding="10px 16px">
                <Flex direction="column" mr={6}>
                  <Text fontWeight={800} fontSize="15pt">
                    {communityData.id}
                  </Text>
                  <Text fontWeight={400} fontSize="10pt" color="green.400">
                   ✤/{communityData.id}
                  </Text>
                </Flex>
                <Flex>
                  <Button
                    variant={isJoined ? "outline" : "solid"}
                    height="30px"
                    pr={6}
                    pl={6}
                    isLoading={loading}
                    onClick={()=>onJoinOrLeaveCommunity(communityData,isJoined)}
                  >
                    {isJoined ? "Joined" : "Join"}
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      );
    };
    export default Header;

