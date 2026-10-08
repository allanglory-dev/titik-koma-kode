package id.titikkoma.backend.seed;

import java.text.Normalizer;
import java.util.Locale;

/** Mengubah judul menjadi potongan alamat yang aman dan tetap sama selama judulnya tetap. */
public final class Slug {

    private Slug() {
    }

    public static String of(String teks) {
        if (teks == null || teks.isBlank()) {
            return "";
        }
        // Pisahkan tanda aksen dari hurufnya, lalu buang tandanya.
        String bersih = Normalizer.normalize(teks, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase(Locale.ROOT);

        return bersih
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-+|-+$", "");
    }
}
