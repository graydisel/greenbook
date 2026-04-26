import { Card, CardContent, Skeleton } from "@mui/material";

export const BookCardSkeleton = () => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Skeleton
        variant="rectangular"
        sx={{
          height: 200,
          pt: 2,
          backgroundColor: 'inherit',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" height={32} width="80%" />
        <Skeleton variant="text" height={20} width="60%" />
        <Skeleton variant="text" height={20} width="40%" />
        <Skeleton variant="text" height={20} width="50%" />
      </CardContent>
      <Skeleton variant="rectangular" height={36} sx={{ mx: 1, mb: 1 }} />
    </Card>
  );
};
