import React, { useState, useEffect } from 'react';
import adminService from '../../../services/admin';
import Navigation from '../../../components/Navigation';
import Table from '../../../components/Table';
import Context from '../../../components/Context';
import { ButtonSpinner } from '../../../components/Spinner';
import {
	FaUserGraduate,
	FaUniversity,
	FaUserShield,
	FaUserTie,
	FaListAlt,
	FaSearch,
	FaEdit,
	FaPortrait,
} from 'react-icons/fa';

import {
	Container,
	Sheet,
	Title,
	SearchSection,
	SearchBar,
	Button,
	Link,
	Avatar,
	TableSection,
} from './styles';

function ListStudents({ location: { panelSearchInput } }) {
	const [list, setList] = useState();
	const [searchInput, setSearchInput] = useState({
		initial: panelSearchInput ? panelSearchInput : '',
		value: '',
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function getStudents(username = '') {
			if (username === '') {
				const response = await adminService.get.students();
				const rows = response.map((user) => createTableRow(user));
				setList(rows);
			} else {
				const [student, status] = await adminService.get.studentByUsername(
					username
				);
				status === 200 ? setList([createTableRow(student)]) : setList();
			}
		}

		if (searchInput.initial !== '') {
			getStudents(searchInput.initial);
		} else {
			getStudents();
		}
	}, [searchInput]);

	async function getStudentByUsername() {
		setLoading(true);
		const [student, status] = await adminService.get.studentByUsername(
			searchInput.value
		);
		status === 200 ? setList([createTableRow(student)]) : setList();
		setLoading(false);
	}

	function handleSearch(event) {
		event.preventDefault();
		getStudentByUsername();
	}

	const createTableRow = (user) => [
		{
			data: user.avatar_url ? (
				<Avatar>
					<img src={user.avatar_url} alt={`${user.username} profile`} />
				</Avatar>
			) : (
				<Avatar>
					<span>{user.first_name.charAt(0)}</span>
				</Avatar>
			),
		},
		{ data: user.username },
		{ data: `${user.first_name} ${user.last_name}`, align: 'left' },
		{
			data: (
				<Link to={`/students/${user.username}/edit`}>
					<FaEdit />
				</Link>
			),
		},
	];

	return (
		<>
			<Navigation
				items={[
					{ icon: <FaUserGraduate />, name: 'Alunos', path: '/students' },
					{ icon: <FaUserTie />, name: 'Professores', path: '/professors' },
					{ icon: <FaUserShield />, name: 'Admins', path: '/admins' },
					{ icon: <FaUniversity />, name: 'Cursos', path: '/courses' },
				]}
			/>
			<Context
				path={[
					{ tier: 'students', title: 'alunos' },
					{ tier: 'students/list', title: 'listar' },
				]}
			/>
			<Container>
				<Sheet>
					<Title>
						<FaListAlt />
						<span>Alunos</span>
					</Title>
					<SearchSection onSubmit={handleSearch}>
						<SearchBar
							placeholder={'Procurar aluno...'}
							onChange={({ target }) =>
								setSearchInput({ initial: '', value: target.value })
							}
							value={
								searchInput.initial === ''
									? searchInput.value
									: searchInput.initial
							}
						/>
						<Button>{loading ? <ButtonSpinner /> : <FaSearch />}</Button>
						<span>Procurar por número de Aluno</span>
					</SearchSection>
					<TableSection>
						<Table
							columns_width={[9, 15, 67, 9]}
							columns={[
								{ name: <FaPortrait /> },
								{ name: 'Número' },
								{ name: 'Nome', align: 'left' },
							]}
							rows={list}
						/>
					</TableSection>
				</Sheet>
			</Container>
		</>
	);
}

export default ListStudents;