import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CommentCard({ name, email, body }) {
  return (
    <Card sx={{ mb: 2, bgcolor: 'ghostwhite' }}>
      <CardContent>
        <Typography variant="title" color="black" sx={{ fontSize: '1.25rem'}}>
          {name} ({email})
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CommentCard;