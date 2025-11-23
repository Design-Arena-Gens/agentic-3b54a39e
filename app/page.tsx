/* eslint-disable react/no-unescaped-entities */
"use client";

import { useMemo, useState } from "react";

type CheckResult = {
  category: string;
  severity: "faible" | "moyenne" | "?lev?e";
  reason: string;
  suggestion?: string;
};

const RISK_RULES: Array<{
  pattern: RegExp;
  category: string;
  severity: CheckResult["severity"];
  reason: string;
  suggestion?: string;
}> = [
  {
    pattern: /(violence|tuer|explosif|arme|bombe|fabrication d'?armes)/i,
    category: "S?curit? et violence",
    severity: "?lev?e",
    reason:
      "La demande semble encourager ou d?tailler des actes violents ou dangereux.",
    suggestion:
      "Formuler une question d'analyse ou d'histoire sans demander d'instructions op?rationnelles.",
  },
  {
    pattern: /(pirater|hack|contourner|crack|keygen|malware|phishing)/i,
    category: "S?curit? informatique",
    severity: "?lev?e",
    reason:
      "La demande peut viser ? contourner la s?curit?, violer des comptes ou produire des logiciels malveillants.",
    suggestion:
      "Poser des questions sur la cybers?curit? de mani?re d?fensive, ?ducative ou ax?e sur les bonnes pratiques.",
  },
  {
    pattern:
      /(drogue|stup?fiant|m?thamph?tamine|coca?ne|recette.*(ill?gale|maison))/i,
    category: "Substances et activit?s ill?gales",
    severity: "?lev?e",
    reason:
      "La demande semble viser des instructions pour des activit?s ill?gales.",
    suggestion:
      "Demander des informations g?n?rales de sant? publique ou de r?duction des risques sans instructions pratiques.",
  },
  {
    pattern: /(haine|insulte|race|ethnie|religion|orientation|genre).*?(tuer|nuire|inf?rieur)/i,
    category: "Discours haineux",
    severity: "?lev?e",
    reason:
      "La demande peut cibler des groupes prot?g?s de mani?re haineuse ou violente.",
    suggestion:
      "Formuler une analyse critique ou historique, sans incitation, visant l??ducation et la compr?hension.",
  },
  {
    pattern: /(sexe|porn|nsfw|mineur|18-?|nude|nu(e)?)/i,
    category: "Contenu adulte et mineurs",
    severity: "?lev?e",
    reason:
      "Le contenu sexuel explicite, en particulier impliquant des mineurs, est interdit.",
    suggestion:
      "?viter le contenu explicite ; s?en tenir ? l??ducation sexuelle factuelle et appropri?e ? l??ge.",
  },
  {
    pattern: /(diagnostic|traitement|posologie|dose).*?(sans|pas de) (m?decin|professionnel)/i,
    category: "Conseils m?dicaux ? risque",
    severity: "moyenne",
    reason:
      "Les conseils m?dicaux personnalis?s n?cessitent un professionnel qualifi?.",
    suggestion:
      "Demander des informations g?n?rales et ajouter une incitation ? consulter un professionnel.",
  },
  {
    pattern: /(investir|bourse|crypto|trading).*?(garanti|sans risque|certain)/i,
    category: "Conseils financiers",
    severity: "moyenne",
    reason:
      "Les promesses de gains garantis ou sans risque ne sont pas appropri?es.",
    suggestion:
      "Poser des questions sur les principes, les risques et la diversification.",
  },
  {
    pattern: /(donn?es personnelles|num?ro de carte|mot de passe|iban|ssn)/i,
    category: "Donn?es personnelles",
    severity: "moyenne",
    reason:
      "La demande peut conduire ? la collecte, l?exposition ou l?abus de donn?es sensibles.",
    suggestion:
      "Minimiser les donn?es, anonymiser et demander un consentement explicite.",
  },
];

function checkPrompt(prompt: string): CheckResult[] {
  const results: CheckResult[] = [];
  for (const rule of RISK_RULES) {
    if (rule.pattern.test(prompt)) {
      results.push({
        category: rule.category,
        severity: rule.severity,
        reason: rule.reason,
        suggestion: rule.suggestion,
      });
    }
  }
  return results;
}

export default function HomePage() {
  const [input, setInput] = useState("");
  const results = useMemo(() => checkPrompt(input), [input]);

  return (
    <div className="stack-lg">
      <section className="card">
        <h2>Qu?est-ce que la mod?ration de contenu ?</h2>
        <p>
          Les syst?mes d?IA appliquent des r?gles pour limiter les abus,
          prot?ger les personnes et respecter la loi. Quand une invite est{" "}
          <strong>?refus?e?</strong>, cela signifie que le syst?me a d?tect? un
          risque potentiel (p. ex. violence, ill?galit?, vie priv?e) et pr?f?re
          r?pondre par une explication, une reformulation ou un refus.
        </p>
      </section>

      <section className="card">
        <h2>Pourquoi mon message a-t-il ?t? bloqu? ?</h2>
        <ul className="bullets">
          <li>
            <strong>Risque de pr?judice</strong>: demandes pouvant causer des
            dommages physiques, num?riques ou psychologiques.
          </li>
          <li>
            <strong>Conformit? l?gale</strong>: activit?s ill?gales, contenu
            prot?g? ou confidentialit?.
          </li>
          <li>
            <strong>Normes de s?curit?</strong>: cat?gories interdites (p. ex.
            violence, haine, exploitation des mineurs).
          </li>
        </ul>
      </section>

      <section className="card">
        <h2>Essayez votre invite</h2>
        <p className="muted">
          Cet outil p?dagogique identifie des signaux ? risque fr?quents pour
          vous aider ? reformuler.
        </p>
        <label className="field">
          <span>Votre invite</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="D?crivez votre demande ici?"
            rows={4}
          />
        </label>

        {input.trim().length > 0 && (
          <div className="results">
            {results.length === 0 ? (
              <div className="badge ok">Aucun risque ?vident d?tect?</div>
            ) : (
              <ul className="results-list">
                {results.map((r, idx) => (
                  <li key={idx} className={`result ${r.severity}`}>
                    <div className="result-head">
                      <span className={`badge ${r.severity}`}>{r.severity}</span>
                      <strong>{r.category}</strong>
                    </div>
                    <p>{r.reason}</p>
                    {r.suggestion && (
                      <p className="suggestion">
                        Suggestion: <em>{r.suggestion}</em>
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>

      <section className="card">
        <h2>Comment reformuler efficacement</h2>
        <ol className="steps">
          <li>
            <strong>Exprimez un but l?gitime</strong> (?ducation, recherche,
            conformit?, s?curit?).
          </li>
          <li>
            <strong>Supprimez les d?tails op?rationnels</strong> qui permettent
            l?ex?cution d?actes dangereux ou ill?gaux.
          </li>
          <li>
            <strong>G?n?ra?lisez et contextualisez</strong> (analyse, histoire,
            code d?exemple inoffensif).
          </li>
          <li>
            <strong>Ajoutez des garde-fous</strong> (avis professionnel, limites,
            consentement, anonymisation).
          </li>
        </ol>
      </section>
    </div>
  );
}

