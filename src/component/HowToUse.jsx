import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const HowToUse = () => {
    return (
        <Container component="main" maxWidth="md">
            <Typography variant="h5" align="left" color="textSecondary" component="p">
                あそびかた
                <ol>
                    <li>設定を入力して部屋を作成。
                        ドラフト候補は一つを一行づつ入力してください。
                        または既に存在する部屋にニックネームと部屋IDを入力して入室</li>
                    <li>メンバーが揃って準備ができたらホストはSTARTをクリック</li>
                    <li>獲得したいドラフト候補を選択して指名ボタンをクリック</li>
                </ol>
                ルール
                <ul>
                    <li>同一順目で競合した場合、指名者内から抽選し、抽選負けの場合は再指名</li>
                    <li>全員が1人獲得確定したら1順終了</li>
                    <li>設定した終了巡目数まで指名、または参加人数よりドラフト候補が少なくなったら終了</li>
                </ul>
            </Typography>
        </Container>
    );
}

export default HowToUse;
