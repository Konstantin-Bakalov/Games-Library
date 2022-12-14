import { Alert, Box } from '@mui/material';
import { GameModelRequest, MediaRequestModel } from 'shared';
import { useMediaForm } from '../../hooks/use-media-form';
import { useAsyncAction } from '../../hooks/use-async-action';
import { GameInfoForm } from './game-info-form';
import { useValidation } from '../../hooks/use-validation';

type SetGameType = (
    game: GameModelRequest | ((prev: GameModelRequest) => GameModelRequest),
) => void;

interface GameFormProps {
    game: GameModelRequest;
    setGame: SetGameType;
    onSubmit: (media: MediaRequestModel[]) => void;
    error: unknown;
}

export function GameForm({ game, setGame, onSubmit, error }: GameFormProps) {
    const { render, perform, validate } = useMediaForm();

    const { trigger, loading: uploadLoading } = useAsyncAction(async () => {
        if (validate()) {
            const media = await perform();
            onSubmit(media);
        }
    });

    const { validationError } = useValidation({ error });

    return (
        <Box>
            <GameInfoForm
                game={game}
                onInput={(game: GameModelRequest) =>
                    setGame((prev) => {
                        return { ...prev, ...game };
                    })
                }
                onGenreChange={(game) => setGame(game)}
                onSubmit={trigger}
                loading={uploadLoading}
                error={error}
            >
                {render}
                {validationError?.media && (
                    <Alert severity="error">{validationError.media}</Alert>
                )}
            </GameInfoForm>
        </Box>
    );
}
