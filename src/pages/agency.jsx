import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { UserView } from 'src/sections/user/view';
import { AdminApi } from 'src/api/admin';
import { ApiStatus } from 'src/api/operational.result';

export default function AgencyPage() {
  const [agents, setAgents] = useState([]);

  const onStatusChange = (id) => {
    new AdminApi().changeAgentStatus(id).then((res) => {
      if (res.apiStatus == ApiStatus.SUCCESS) {
        const tempAgent = agents;
        tempAgent.filter((e) => e._id == id).map((e) => (e.isActive = !e.isActive ?? false));
        setAgents(tempAgent);
      }
    });
  };

  const onDelete = (id) => {
    new AdminApi().deleteAgent(id).then((res) => {
      if (res.apiStatus == ApiStatus.SUCCESS) {
        const tempAgent = agents;
        tempAgent.filter((e) => e._id != id);
        setAgents(tempAgent);
      }
    });
  };

  const onAddNew = (emailAddress, name, password) => {
    new AdminApi().addAgent({ emailAddress, name, password }).then((res) => {
      if (res.apiStatus == ApiStatus.SUCCESS) {
        const tempAgent = agents;
        tempAgent.push(res.agent);
        setAgents(tempAgent);
      }
    });
  };

  useEffect(() => {
    const getAgents = () => {
      new AdminApi().getAgent().then((res) => {
        if (res.apiStatus == ApiStatus.SUCCESS) {
          setAgents(res.agents);
        }
      });
    };

    getAgents();
  }, [agents]);

  return (
    <>
      <Helmet>
        <title> User</title>
      </Helmet>

      <UserView
        buttonText="New "
        users={agents}
        title={'Agents'}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
        onAddNew={onAddNew}
      />
    </>
  );
}
