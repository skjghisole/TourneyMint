import React from 'react';
import { inject, observer } from 'mobx-react';
import { TextField, Grid, Button } from '@material-ui/core';

const SetScores = ({ game, bettingStore }) => (
    <Grid container>
        <Grid item sm={12}>
            <TextField
                label={game.sides.home.team.name}
                type={'number'}
                fullWidth
                onChange={({ target: { value } }) => bettingStore.setBet(game.sides.home.team.name, value)}
            />
        </Grid>
        <Grid item sm={12}>
            <TextField
                label={game.sides.visitor.team.name}
                type={'number'}
                fullWidth
                onChange={({ target: { value } }) => bettingStore.setBet(game.sides.visitor.team.name, value)}
            />
        </Grid>
        <Grid item sm={12}>
            <Button onClick={() => bettingStore.submitBet()}>
            	Submit
            </Button>
        </Grid>
    </Grid>
)

export default inject('bettingStore')(observer(SetScores))
