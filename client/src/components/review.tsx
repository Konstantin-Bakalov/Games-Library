import { Avatar, Box, IconButton } from '@mui/material';
import { ReviewModelDetailed } from 'shared';
import dayjs from 'dayjs';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useAsyncAction } from '../hooks/use-async-action';
import { likeService } from '../services/like-service';
import { useState } from 'react';

interface ReviewProps {
    review: ReviewModelDetailed;
}

export function Review({ review }: ReviewProps) {
    const [liked, setLiked] = useState(false);

    const { trigger } = useAsyncAction(async () => {
        await likeService.create(review.id);
        setLiked(true);
    });

    return (
        <Box>
            <Avatar alt="Remy Sharp" src={review.profilePicture} />
            <Box>{review.username}</Box>
            <Box>{review.body}</Box>
            <Box>{dayjs(review.createdAt).format('D-MMM-YYYY HH:mma')}</Box>
            <IconButton onClick={trigger}>
                {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
            </IconButton>
            <IconButton>
                <ThumbDownOffAltIcon />
            </IconButton>
        </Box>
    );
}