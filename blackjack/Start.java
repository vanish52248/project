import java.util.*;

public class Start {

    public static int numberFormatter(String number) {
        /*
         * 数字を文字列から数値に変換する
         */
        int formatNumber;
        if (number == "J" || number == "Q" || number == "K") {
            formatNumber = 10;
        } else {
            formatNumber = Integer.parseInt(number);
        }
        return formatNumber;
    }

    public static void initGame() {

        // 自分がカードを引くか否かのフラグ
        boolean flag = true;

        // 引いたカードの枚数(初回2枚引いた後から想定するので初期値が3)
        int count = 3;

        System.out.println("Black Jackを開始します。");
        System.out.println();
        try {
            // 開始前に1秒停止
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            System.out.println(e);
        }

        System.out.println("あなたの番です。");
        // 1枚目の自カード
        Tranp myTranp = new Tranp();
        System.out.println("1枚目にあなたが引いたカードは" + myTranp.getSuit() + " の" + myTranp.getNumber() + "です。");

        // 2枚目の自カード
        Tranp myTranp2 = new Tranp();
        System.out.println("2枚目にあなたが引いたカードは" + myTranp2.getSuit() + " の" + myTranp2.getNumber() + "です。");

        System.out.println();

        System.out.println("相手の番です。");
        // 1枚目の相手カード
        Tranp enemyTranp = new Tranp();
        System.out.println("1枚目に相手が引いたカードは" + enemyTranp.getSuit() + " の" + enemyTranp.getNumber() + "です。");

        // 2枚目の相手カード
        Tranp enemyTranp2 = new Tranp();
        System.out.println("2枚目に相手が引いたカードはわかりません。");

        System.out.println();
        int myTotalNumber = numberFormatter(myTranp.getNumber()) + numberFormatter(myTranp2.getNumber());
        System.out.println("あなたの現在の合計は" + myTotalNumber + "です。");

        Scanner sc = new Scanner(System.in);

        // 自分が追加で引くフェーズ
        while (myTotalNumber <= 21 && flag) {
            System.out.println("更にカードを引きますか？ y: yes / それ以外: no");
            String next = sc.next();
            if (next.equals("y")) {
                // N枚目の自カード
                Tranp myTranpN = new Tranp();
                System.out.println(count + "枚目にあなたが引いたカードは" + myTranpN.getSuit() + " の" + myTranpN.getNumber() + "です。");
                myTotalNumber += numberFormatter(myTranpN.getNumber());
                System.out.println("あなたの現在の合計は" + myTotalNumber + "です。");
                count++;
            } else {
                flag = false;
            }
        }
        sc.close();

        System.out.println();

        System.out.println("2枚目に相手が引いたカードは" + enemyTranp2.getSuit() + " の" + enemyTranp2.getNumber() + "でした。");

        int enemyTotalNumber = numberFormatter(enemyTranp.getNumber()) + numberFormatter(enemyTranp2.getNumber());
        System.out.println("相手の現在の合計は" + enemyTotalNumber + "です。");

        // 相手が追加で引くフェーズ
        count = 3;
        while (enemyTotalNumber <= 16) {
            Tranp enemyTranpN = new Tranp();
            System.out.println();
            System.out.println(count + "枚目に相手が引いたカードは" + enemyTranpN.getSuit() + " の" + enemyTranpN.getNumber() + "です。");
            enemyTotalNumber += numberFormatter(enemyTranpN.getNumber());
            System.out.println("相手の現在の合計は" + enemyTotalNumber + "です。");
            count++;
        }

        System.out.println();

        // 勝敗判定フェーズ
        System.out.println("あなたの合計は" + myTotalNumber + "です。");
        System.out.println("相手の合計は" + enemyTotalNumber + "です。");

        if (enemyTotalNumber > 21 && myTotalNumber > 21) {
            System.out.println("お互いに21を超えたので引き分けです。");
        } else if (enemyTotalNumber > 21) {
            System.out.println("相手が21を超えたのであなたの勝ちです！");
        } else if (myTotalNumber > 21) {
            System.out.println("21を超えたのであなたの負けです・・・");
        } else if ((21 - myTotalNumber) > (21 - enemyTotalNumber)) {
            System.out.println("あなたの勝ちです！");
        } else if ((21 - myTotalNumber) < (21 - enemyTotalNumber)) {
            System.out.println("あなたの負けです・・・");
        } else {
            System.out.println("引き分けです。");
        }
        System.out.println("Black Jackを終了します。");
    }
}
