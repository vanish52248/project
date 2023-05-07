import java.util.*;

public class Tranp {
    // トランプの種類
    private int suit;
    // トランプの数字
    private int number;

    public Tranp() {
        /*
         * コンストラクタ
         * インスタンス化　時にトランプの種類と数字をランダムで生成する
         */
        this.suit = new Random().nextInt(1, 4+1);
        this.number = new Random().nextInt(1, 13+1);
    }

    public String getSuit() {
        /*
         * トランプの種類はマークに変換後に返却する
         */
        return this.judgeSuit(this.suit);
    }

    public String getNumber() {
        /*
         * トランプの数字は文字列に変換後に返却する
         */
        return this.judgNumber(this.number);
    }

    private String judgeSuit(int suit) {
        /*
         * トランプの種類を数字からマークに変換する
         */
        String formatSuit = "";
        if (suit == 1) {
            formatSuit = "♡";
        } else if (suit == 2) {
            formatSuit = "♤";
        } else if (suit == 3) {
            formatSuit = "♧";
        } else if (suit == 4) {
            formatSuit = "♢";
        }
        // System.out.println("変換前:" + suit + "  変換後: " + formatSuit);
        return formatSuit;
    }

    private String judgNumber(int number) {
        /*
         * トランプの数字を数字から文字列に変換する([11, 12, 13] => [J, Q, K])
         */
        String formatNumber = "";
        if (number == 11) {
            formatNumber = "J";
        } else if (number == 12) {
            formatNumber = "Q";
        } else if (number == 13) {
            formatNumber = "K";
        } else {
            formatNumber = String.valueOf(number);
        }
        // System.out.println("変換前:" + number + "  変換後: " + formatNumber);
        return formatNumber;
    }

    public String toString() {
        return "suit:" + this.suit + "  number:" + this.number;
    }
}
