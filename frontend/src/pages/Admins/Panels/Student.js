import React, { useEffect, useState } from 'react';
import adminService from '../../../services/admin';

import Navigation from '../../../components/Navigation';
import Spinner from '../../../components/Spinner';
import Context from '../../../components/Context';
import { StatusCard, SearchCard, XSmallCard } from '../../../components/Card';

import {
	FaUserGraduate,
	FaUniversity,
	FaUserShield,
	FaUserTie,
	FaListUl,
	FaUserPlus,
	FaFileUpload,
} from 'react-icons/fa';

import { Container, StatusCardData } from './styles';

function StudentPanel() {
	const [loading, setLoading] = useState(true);
	const [students, setStudents] = useState({ online: [], offline: [] });

	async function setUsersStatus(setUsersState, service) {
		const users = await service();
		const online = users.filter((user) => user.status === 'online');
		const offline = users.filter((user) => user.status === 'offline');
		setUsersState({ online, offline });
	}

	useEffect(() => {
		async function setState() {
			await setUsersStatus(setStudents, adminService.getStudents);
			setLoading(false);
		}
		setState();
	}, []);

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
			<Context path={[{ tier: 'students', title: 'alunos' }]} />
			{loading ? (
				<Spinner />
			) : (
				<Container>
					<StatusCard
						data={
							<>
								<StatusCardData status="online">
									{students.online.length} online <span></span>
								</StatusCardData>
								<StatusCardData status="offline">
									{students.offline.length} offline <span></span>
								</StatusCardData>
							</>
						}
					/>
					<SearchCard
						placeholder={'Procurar aluno...'}
						info={'Procure por número de aluno'}
					/>
					<XSmallCard
						path={'students/list'}
						label={'Ver lista de Alunos'}
						icon={<FaListUl />}
					/>
					<XSmallCard
						path={'students/new'}
						label={'Adicionar Aluno'}
						icon={<FaUserPlus />}
					/>
					<XSmallCard
						path={'students/file'}
						label={'Carregar ficheiro'}
						icon={<FaFileUpload />}
					/>
				</Container>
			)}
		</>
	);
}

export default StudentPanel;