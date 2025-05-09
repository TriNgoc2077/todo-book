import { Button, Input, Modal, notification } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";
const UserForm = (props) => {
	const { loadData } = props;
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleSubmitBtn = async () => {
		const response = await createUserAPI(fullName, email, password, phone);
		if (response.data) {
			notification.success({
				message: "create user",
				description: "tạo user thành công",
			});
			resetAndCloseModal();
			await loadData();
		} else {
			notification.error({
				message: "Error create user",
				description: JSON.stringify(response.message),
			});
		}
	};
	const resetAndCloseModal = () => {
		setIsModalOpen(false);
		setFullName("");
		setEmail("");
		setPassword("");
		setPhone("");
	};
	return (
		<div className="user-form" style={{ margin: "20px 0" }}>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<h3>Table Users</h3>

				<Button
					type="primary"
					onClick={() => setIsModalOpen(true)}
					style={{ backgroundColor: "#6d28d9" }}
				>
					Create User
				</Button>
			</div>
			<Modal
				title="Create User"
				open={isModalOpen}
				onOk={() => handleSubmitBtn()}
				onCancel={() => setIsModalOpen(false)}
				maskClosable={false}
				okText="CREATE"
				okButtonProps={{
					style: {
						backgroundColor: "#6d28d9",
					},
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "10px",
					}}
				>
					<div>
						<span>Full Name</span>
						<Input
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
						/>
					</div>
					<div>
						<span>Email</span>
						<Input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<span>Password</span>
						<Input.Password
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<span>Phone number</span>
						<Input
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default UserForm;
