import { Flex, Image, Box, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsSend, BsFillImageFill } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import usePreviewImg from "../../hooks/usePreviewimg";
import useSendMessage from "../../hooks/useSendMessage";

import '../../App.css'

const MessageInput = () => {
	const { onClose } = useDisclosure();
	const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
	const [isSending,] = useState(false);
	const [message, setMessage] = useState("");
	const imageRef = useRef(null);
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message && !imgUrl) return;
		await sendMessage(message, imgUrl); // Pass imgUrl as a parameter
		setMessage("");
		setImgUrl("");
	};

	return (
		<Flex gap={2} alignItems="center">
			<form className="px-4 my-3" onSubmit={handleSubmit} style={{ flex: 65 }}>
				<div className="w-full relative">
					<input
						type="text"
						className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
						placeholder="Send a message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
						{loading ? <div className="loading loading-spinner"></div> : <BsSend />}
					</button>
				</div>
			</form>
			<div className="btn-group dropup">
				<button type="button" className="btn btn-secondary dropdown-toggle shareicon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<i className="fa fa-share-alt" aria-hidden="true"></i>
				</button>
				<div className="dropdown-menu sharecontainer">
					{/* Dropdown menu links */}
					<i className="fa fa-home" />
					<Flex flex={5} cursor="pointer">
						<BsFillImageFill size={20} onClick={() => imageRef.current.click()} />
						<input type="file" hidden ref={imageRef} onChange={handleImageChange} />
					</Flex>
				</div>
			</div>
			<Modal isOpen={imgUrl} onClose={() => { onClose(); setImgUrl(""); }}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader />
					<ModalCloseButton />
					<ModalBody>
						<Flex mt={5} w="full" justify="center"> {/* Center the image horizontally */}
							<Box borderWidth="1px" borderColor="gray.200" p={2}> {/* Add border and padding */}
								<Image src={imgUrl} maxH="80vh" /> {/* Set max height to prevent overflowing */}
							</Box>
						</Flex>
						<Flex justifyContent="flex-end" my={2}>
							{!isSending ? <IoSendSharp size={24} cursor="pointer" onClick={handleSubmit} /> : <Spinner size="md" />}
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>

		</Flex>
	);
};

export default MessageInput;
