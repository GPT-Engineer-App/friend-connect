import React, { useState } from "react";
import { Box, Button, Heading, Input, Text, VStack, HStack, Avatar, Textarea, Spacer } from "@chakra-ui/react";
import { FaPlus, FaComments, FaCalendar } from "react-icons/fa";

const Index = () => {
  const [friends, setFriends] = useState([]);
  const [name, setName] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [message, setMessage] = useState("");
  const [meeting, setMeeting] = useState("");

  const handleAddFriend = () => {
    if (name.trim() !== "") {
      const newFriend = {
        id: Date.now(),
        name,
        messages: [],
        meetings: [],
      };
      setFriends([...friends, newFriend]);
      setName("");
    }
  };

  const handleSendMessage = () => {
    if (selectedFriend && message.trim() !== "") {
      const updatedFriends = friends.map((friend) => {
        if (friend.id === selectedFriend.id) {
          return {
            ...friend,
            messages: [...friend.messages, message],
          };
        }
        return friend;
      });
      setFriends(updatedFriends);
      setMessage("");
    }
  };

  const handleArrangeMeeting = () => {
    if (selectedFriend && meeting.trim() !== "") {
      const updatedFriends = friends.map((friend) => {
        if (friend.id === selectedFriend.id) {
          return {
            ...friend,
            meetings: [...friend.meetings, meeting],
          };
        }
        return friend;
      });
      setFriends(updatedFriends);
      setMeeting("");
    }
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Friend Connection App</Heading>
      <HStack mb={4}>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter friend's name" />
        <Button leftIcon={<FaPlus />} onClick={handleAddFriend}>
          Add Friend
        </Button>
      </HStack>
      <VStack align="stretch" spacing={4}>
        {friends.map((friend) => (
          <Box key={friend.id} p={4} borderWidth={1} borderRadius="md" cursor="pointer" onClick={() => setSelectedFriend(friend)} bg={selectedFriend?.id === friend.id ? "gray.100" : "white"}>
            <HStack>
              <Avatar name={friend.name} />
              <Text fontWeight="bold">{friend.name}</Text>
            </HStack>
          </Box>
        ))}
      </VStack>
      {selectedFriend && (
        <Box mt={8}>
          <Heading size="md" mb={4}>
            Chat with {selectedFriend.name}
          </Heading>
          <VStack align="stretch" spacing={4}>
            {selectedFriend.messages.map((msg, index) => (
              <Box key={index} p={2} borderWidth={1} borderRadius="md">
                <Text>{msg}</Text>
              </Box>
            ))}
          </VStack>
          <HStack mt={4}>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
            <Button leftIcon={<FaComments />} onClick={handleSendMessage}>
              Send
            </Button>
          </HStack>
          <Heading size="md" mt={8} mb={4}>
            Arrange a Meeting
          </Heading>
          <HStack>
            <Input value={meeting} onChange={(e) => setMeeting(e.target.value)} placeholder="Enter meeting details" />
            <Button leftIcon={<FaCalendar />} onClick={handleArrangeMeeting}>
              Arrange
            </Button>
          </HStack>
          <VStack align="stretch" spacing={4} mt={4}>
            {selectedFriend.meetings.map((mtg, index) => (
              <Box key={index} p={2} borderWidth={1} borderRadius="md">
                <Text>{mtg}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default Index;
