import React from 'react';
import { Card } from '@heroui/react';

const Dashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <Card.Header>
          <Card.Title>Dashboard</Card.Title>
        </Card.Header>
        <Card.Content>
          <p>Em construção.</p>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Dashboard;
