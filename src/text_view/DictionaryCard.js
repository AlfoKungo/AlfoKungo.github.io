import React from "react";
import {
  Card,
  CardContent,
  ListItemSecondaryAction,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
const parseHTML = (htmlStr) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlStr, "text/html");

  const title = doc.querySelector(".lemma_desc .dictLink").textContent;
  let gender = doc.querySelector(".tag_lemma_context");
  if (gender) gender = gender.textContent;
  let type = doc.querySelector(".lemma_desc .tag_wordtype");
  if (type) type = type.textContent;

  const translations = Array.from(
    doc.querySelectorAll(
      ".translation.featured, .translation.sortablemg:not(.translation_group)"
    )
  )
    .filter(
      (el) => !el.parentElement.classList.contains("translation_group_line")
    )
    .map((el) => {
      let trs = el.querySelectorAll(".tag_e");
      if (trs !== null)
        trs = Array.from(trs).map((inel) => {
          return inel.textContent;
        });
      let type = el.querySelector(".tag_type")
        ? el.querySelector(".tag_type").textContent
        : null;
      return {
        word: el.querySelector(".dictLink").textContent,
        type: type,
        trs: trs,
      };
    });
  let translation_group = doc.querySelector(".translation_group");
  if (translation_group)
    translation_group = Array.from(
      translation_group.querySelectorAll(".translation")
    ).map((el) => {
      let word = el.querySelector(".dictLink").textContent;
      let place_holder = el.querySelector(".placeholder");
      if (place_holder !== null) {
        place_holder = place_holder.textContent;
        word = word.replace(place_holder, "").trim();
      }
      let type = el.querySelector(".tag_type");
      if (type) type = type.textContent;
      return {
        word: word,
        place_holder: place_holder,
        type: type,
      };
    });
  let example = doc.querySelector(".example .tag_e");
  if (example) example = example.textContent;
  return { title, gender, type, translations, translation_group };
};
// let html_data = [
//   {
//     word: '<div><h2 class="line lemma_desc" lid="PT:certo57693"><span class="tag_lemma"><a class="dictLink" rel="nofollow" href="/portuguese-english/translation/certo.html">certo</a> <a id="PT_BR/a8/a83e04630cf0fadfb641d66a91e5974a-300" class="audio" onclick="playSound(this,&quot;PT_BR/a8/a83e04630cf0fadfb641d66a91e5974a-300&quot;,&quot;Brazilian Portuguese&quot;,&quot;PT_PT/a8/a83e04630cf0fadfb641d66a91e5974a-300&quot;,&quot;European Portuguese&quot;);"></a> <span class="tag_wordtype">adjective, masculine</span></span> <span class="tag_forms forms_adj-flexion"> (<span class="tag_s"><a class="formLink" href="/portuguese-english/translation/certa.html" rel="nofollow">certa</a> <span class="tag_type">f sl</span></span>, <span class="tag_s"><a class="formLink" href="/portuguese-english/translation/certos.html" rel="nofollow">certos</a> <span class="tag_type">m pl</span></span>, <span class="tag_s"><a class="formLink" href="/portuguese-english/translation/certas.html" rel="nofollow">certas</a> <span class="tag_type">f pl</span></span>)</span><span class="dash">—</span></h2><div class="lemma_content"><div class="meaninggroup  sortablemg" gid="0"><div class="translation_lines"><div class="translation sortablemg featured"><h3 class="translation_desc"><span class="tag_trans" bid="10000947405" lid="EN:right61869"><a id="dictEntry10000947405" href="/english-portuguese/translation/right.html" class="dictLink featured">right</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/7c/7c4f29407893c334a6cb7a87bf045c0d-300" class="audio" onclick="playSound(this,&quot;EN_US/7c/7c4f29407893c334a6cb7a87bf045c0d-300&quot;,&quot;American English&quot;,&quot;EN_UK/7c/7c4f29407893c334a6cb7a87bf045c0d-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></h3><!--translation_desc--><!-- editorial isFeatured 1 inType 0 allowFeatured 1 available: 2 -->\n<div class="example_lines"><div class="example line " sid="43698"><span class="tag_e"><span class="tag_s">Só a chave certa pode destrancar a porta.</span> <span class="dash">—</span>&nbsp;<span class="tag_t">Only the right key can unlock the door.</span><span class="tag_e_end"></span></span></div><div class="example line " sid="66256"><span class="tag_e"><span class="tag_s">Na verdade, os críticos estavam certos: o romance é ótimo.</span> <span class="dash">—</span>&nbsp;<span class="tag_t">In fact, the critics were right: the novel is great.</span><span class="tag_e_end"></span></span></div></div></div>\n<div class="translation sortablemg featured"><h3 class="translation_desc"><span class="tag_trans" bid="10000947402" lid="EN:certain4145"><a id="dictEntry10000947402" href="/english-portuguese/translation/certain.html" class="dictLink featured">certain</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/ef/efe6b2c2589e25605d9f62170933c925-300" class="audio" onclick="playSound(this,&quot;EN_US/ef/efe6b2c2589e25605d9f62170933c925-300&quot;,&quot;American English&quot;,&quot;EN_UK/ef/efe6b2c2589e25605d9f62170933c925-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></h3><!--translation_desc--><!-- editorial isFeatured 1 inType 0 allowFeatured 1 available: 2 -->\n<div class="example_lines"><div class="example line " sid="53315"><span class="tag_e"><span class="tag_s">Certas coisas só deveriam ser discutidas em particular.</span> <span class="dash">—</span>&nbsp;<span class="tag_t">Certain things should only be discussed in private.</span><span class="tag_e_end"></span></span></div><div class="example line " sid="50308"><span class="tag_e"><span class="tag_s">Os candidatos devem cumprir certos requisitos.</span> <span class="dash">—</span>&nbsp;<span class="tag_t">Applicants must meet certain requirements.</span><span class="tag_e_end"></span></span></div></div></div>\n<div class="translation sortablemg featured"><h3 class="translation_desc"><span class="tag_trans" bid="10000947408" lid="EN:sure64913"><a id="dictEntry10000947408" href="/english-portuguese/translation/sure.html" class="dictLink featured">sure</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/d5/d5e1f5a7f2fe3dab21da19f1c04fbd2b-300" class="audio" onclick="playSound(this,&quot;EN_US/d5/d5e1f5a7f2fe3dab21da19f1c04fbd2b-300&quot;,&quot;American English&quot;,&quot;EN_UK/d5/d5e1f5a7f2fe3dab21da19f1c04fbd2b-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></h3><!--translation_desc--><!-- editorial isFeatured 1 inType 0 allowFeatured 1 available: 1 -->\n<div class="example_lines"><div class="example line " sid="37669"><span class="tag_e"><span class="tag_s">Eu estou certo de que nós chegaremos na hora.</span> <span class="dash">—</span>&nbsp;<span class="tag_t">I am sure we will arrive on time.</span><span class="tag_e_end"></span></span></div></div></div>\n<div class="translation sortablemg featured"><h3 class="translation_desc"><span class="tag_trans" bid="10000979834" lid="EN:true24395"><a id="dictEntry10000979834" href="/english-portuguese/translation/true.html" class="dictLink featured">true</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/b3/b326b5062b2f0e69046810717534cb09-300" class="audio" onclick="playSound(this,&quot;EN_US/b3/b326b5062b2f0e69046810717534cb09-300&quot;,&quot;American English&quot;,&quot;EN_UK/b3/b326b5062b2f0e69046810717534cb09-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></h3><!--translation_desc--><!-- editorial isFeatured 1 inType 0 allowFeatured 1 available: 1 -->\n<div class="example_lines"><div class="example line " sid="174878"><span class="tag_e"><span class="tag_s">Dicionários são utilizados para achar o significado certo de uma palavra.</span> <span class="dash">—</span>&nbsp;<span class="tag_t">Dictionaries are used to find the true meaning of a word.</span><span class="tag_e_end"></span></span></div></div></div>\n<div class="translation sortablemg featured"><h3 class="translation_desc"><span class="tag_trans" bid="10003200632" lid="EN:correct32450"><a id="dictEntry10003200632" href="/english-portuguese/translation/correct.html" class="dictLink featured">correct</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/e5/e5d7cffe25654f7e3a1e334118c71549-300" class="audio" onclick="playSound(this,&quot;EN_US/e5/e5d7cffe25654f7e3a1e334118c71549-300&quot;,&quot;American English&quot;,&quot;EN_UK/e5/e5d7cffe25654f7e3a1e334118c71549-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></h3><!--translation_desc--><!-- editorial isFeatured 1 inType 0 allowFeatured 1 available: 1 -->\n<div class="example_lines"><div class="example line " sid="142306"><span class="tag_e"><span class="tag_s">O aluno sabia a resposta certa para a pergunta.</span> <span class="dash">—</span>&nbsp;<span class="tag_t">The student knew the correct answer to the question.</span><span class="tag_e_end"></span></span></div></div></div>\n<div class="translation sortablemg featured"><h3 class="translation_desc"><span class="tag_trans" bid="10007461255" lid="EN:confident18990"><a id="dictEntry10007461255" href="/english-portuguese/translation/confident.html" class="dictLink featured">confident</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/e2/e2fae53ea1d350549bd9dbfc575d7d02-300" class="audio" onclick="playSound(this,&quot;EN_US/e2/e2fae53ea1d350549bd9dbfc575d7d02-300&quot;,&quot;American English&quot;,&quot;EN_UK/e2/e2fae53ea1d350549bd9dbfc575d7d02-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></h3><!--translation_desc--><!-- editorial isFeatured 1 inType 0 allowFeatured 1 available: 1 -->\n<div class="example_lines"><div class="example line " sid="121530"><span class="tag_e"><span class="tag_s">Estou certo sobre minhas chances de sucesso.</span> <span class="dash">—</span>&nbsp;<span class="tag_t">I am confident about my chances of success.</span><span class="tag_e_end"></span></span></div></div></div>\n<div class="translation_group"><div class="line group_line translation_group_line"><span class="notascommon">less common:</span> <div class="translation sortablemg translation_first"><div class="translation_desc"><span class="tag_trans" bid="10000979941" lid="EN:good11283"><a id="dictEntry10000979941" href="/english-portuguese/translation/good.html" class="dictLink">good</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/75/755f85c2723bb39381c7379a604160d8-300" class="audio" onclick="playSound(this,&quot;EN_US/75/755f85c2723bb39381c7379a604160d8-300&quot;,&quot;American English&quot;,&quot;EN_UK/75/755f85c2723bb39381c7379a604160d8-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10007466210" lid="EN:due60592"><a id="dictEntry10007466210" href="/english-portuguese/translation/due.html" class="dictLink">due</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_UK/d6/d6692dd335c3c6b2ad020e2758eed628-300" class="audio" onclick="playSound(this,&quot;EN_UK/d6/d6692dd335c3c6b2ad020e2758eed628-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10000979828" lid="EN:regular38490"><a id="dictEntry10000979828" href="/english-portuguese/translation/regular.html" class="dictLink">regular</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/af/af37d08ae228a87dc6b265fd1019c97d-300" class="audio" onclick="playSound(this,&quot;EN_US/af/af37d08ae228a87dc6b265fd1019c97d-300&quot;,&quot;American English&quot;,&quot;EN_UK/af/af37d08ae228a87dc6b265fd1019c97d-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10003199632" lid="EN:assured46430"><a id="dictEntry10003199632" href="/english-portuguese/translation/assured.html" class="dictLink">assured</a> <a id="EN_US/40/4050265e5f95a53dc0b9f7d5f9b6da99-300" class="audio" onclick="playSound(this,&quot;EN_US/40/4050265e5f95a53dc0b9f7d5f9b6da99-300&quot;,&quot;American English&quot;,&quot;EN_UK/40/4050265e5f95a53dc0b9f7d5f9b6da99-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10000979823" lid="EN:perfect41051"><a id="dictEntry10000979823" href="/english-portuguese/translation/perfect.html" class="dictLink">perfect</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/82/826ad6b0338304c40b42644b5144f80a-300" class="audio" onclick="playSound(this,&quot;EN_US/82/826ad6b0338304c40b42644b5144f80a-300&quot;,&quot;American English&quot;,&quot;EN_UK/82/826ad6b0338304c40b42644b5144f80a-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10000979820" lid="EN:particular14925"><a id="dictEntry10000979820" href="/english-portuguese/translation/particular.html" class="dictLink">particular</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/e5/e5dee84f405b9366f44feef46df9704d-300" class="audio" onclick="playSound(this,&quot;EN_US/e5/e5dee84f405b9366f44feef46df9704d-300&quot;,&quot;American English&quot;,&quot;EN_UK/e5/e5dee84f405b9366f44feef46df9704d-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10006198770" lid="EN:fine51472"><a id="dictEntry10006198770" href="/english-portuguese/translation/fine.html" class="dictLink">fine</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/ff/fff25994ee3941b225ba898fd17d186f-300" class="audio" onclick="playSound(this,&quot;EN_US/ff/fff25994ee3941b225ba898fd17d186f-300&quot;,&quot;American English&quot;,&quot;EN_UK/ff/fff25994ee3941b225ba898fd17d186f-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10000979827" lid="EN:proper12122"><a id="dictEntry10000979827" href="/english-portuguese/translation/proper.html" class="dictLink">proper</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/d5/d53f18f27b069a5ae88f472a0c2e2745-300" class="audio" onclick="playSound(this,&quot;EN_US/d5/d53f18f27b069a5ae88f472a0c2e2745-300&quot;,&quot;American English&quot;,&quot;EN_UK/d5/d53f18f27b069a5ae88f472a0c2e2745-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10007613382" lid="EN:ideal45425"><a id="dictEntry10007613382" href="/english-portuguese/translation/ideal.html" class="dictLink">ideal</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/b3/b3bfb5ad6ba04daf0f8f1930133d89dd-300" class="audio" onclick="playSound(this,&quot;EN_US/b3/b3bfb5ad6ba04daf0f8f1930133d89dd-300&quot;,&quot;American English&quot;,&quot;EN_UK/b3/b3bfb5ad6ba04daf0f8f1930133d89dd-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10000955860" lid="EN:okay62762"><a id="dictEntry10000955860" href="/english-portuguese/translation/okay.html" class="dictLink">okay</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/df/df8fede7ff71608e24a5576326e41c75-300" class="audio" onclick="playSound(this,&quot;EN_US/df/df8fede7ff71608e24a5576326e41c75-300&quot;,&quot;American English&quot;,&quot;EN_UK/df/df8fede7ff71608e24a5576326e41c75-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10000979825" lid="EN:positive45058"><a id="dictEntry10000979825" href="/english-portuguese/translation/positive.html" class="dictLink">positive</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/82/82082716189f80fd070b89ac716570ba-300" class="audio" onclick="playSound(this,&quot;EN_US/82/82082716189f80fd070b89ac716570ba-300&quot;,&quot;American English&quot;,&quot;EN_UK/82/82082716189f80fd070b89ac716570ba-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10004637236" lid="EN:convinced33964"><a id="dictEntry10004637236" href="/english-portuguese/translation/convinced.html" class="dictLink">convinced</a> <a id="EN_US/ce/ce68032b0f6309be45353d0fc755ce9c-300" class="audio" onclick="playSound(this,&quot;EN_US/ce/ce68032b0f6309be45353d0fc755ce9c-300&quot;,&quot;American English&quot;,&quot;EN_UK/ce/ce68032b0f6309be45353d0fc755ce9c-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10007709394" lid="EN:exact25168"><a id="dictEntry10007709394" href="/english-portuguese/translation/exact.html" class="dictLink">exact</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/3b/3b7efa09444a31c5d58596e5bbf87d47-300" class="audio" onclick="playSound(this,&quot;EN_US/3b/3b7efa09444a31c5d58596e5bbf87d47-300&quot;,&quot;American English&quot;,&quot;EN_UK/3b/3b7efa09444a31c5d58596e5bbf87d47-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10000955277" lid="EN:all#right65347"><a id="dictEntry10000955277" href="/english-portuguese/translation/all+right.html" class="dictLink">all right</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_UK/67/67787c5a3a7b3a7cea96d77aa1f6d338-300" class="audio" onclick="playSound(this,&quot;EN_UK/67/67787c5a3a7b3a7cea96d77aa1f6d338-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10006149277" lid="EN:aware9458"><a id="dictEntry10006149277" href="/english-portuguese/translation/aware.html" class="dictLink">aware</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/d5/d5fd3f92cf27feb84a80eccb6ed5d859-300" class="audio" onclick="playSound(this,&quot;EN_US/d5/d5fd3f92cf27feb84a80eccb6ed5d859-300&quot;,&quot;American English&quot;,&quot;EN_UK/d5/d5fd3f92cf27feb84a80eccb6ed5d859-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10006164668" lid="EN:specified5945"><a id="dictEntry10006164668" href="/english-portuguese/translation/specified.html" class="dictLink">specified</a> <a id="EN_US/7f/7f9deb6b59624ef24e429e073c1a0ffd-300" class="audio" onclick="playSound(this,&quot;EN_US/7f/7f9deb6b59624ef24e429e073c1a0ffd-300&quot;,&quot;American English&quot;,&quot;EN_UK/7f/7f9deb6b59624ef24e429e073c1a0ffd-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10007556803" lid="EN:precise27072"><a id="dictEntry10007556803" href="/english-portuguese/translation/precise.html" class="dictLink">precise</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/d1/d13f6bb08e4138e4cb5fe099b36bc69b-300" class="audio" onclick="playSound(this,&quot;EN_US/d1/d13f6bb08e4138e4cb5fe099b36bc69b-300&quot;,&quot;American English&quot;,&quot;EN_UK/d1/d13f6bb08e4138e4cb5fe099b36bc69b-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10000979939" lid="EN:definite46817"><a id="dictEntry10000979939" href="/english-portuguese/translation/definite.html" class="dictLink">definite</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/79/796836d14714ac8eb4b8e8033fbd9a32-300" class="audio" onclick="playSound(this,&quot;EN_US/79/796836d14714ac8eb4b8e8033fbd9a32-300&quot;,&quot;American English&quot;,&quot;EN_UK/79/796836d14714ac8eb4b8e8033fbd9a32-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10000979831" lid="EN:righteous34668"><a id="dictEntry10000979831" href="/english-portuguese/translation/righteous.html" class="dictLink">righteous</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/d6/d6851d96ceddc3c00a3b973ba79f782b-300" class="audio" onclick="playSound(this,&quot;EN_US/d6/d6851d96ceddc3c00a3b973ba79f782b-300&quot;,&quot;American English&quot;,&quot;EN_UK/d6/d6851d96ceddc3c00a3b973ba79f782b-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10000979935" lid="EN:bound60247"><a id="dictEntry10000979935" href="/english-portuguese/translation/bound.html" class="dictLink">bound</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/b9/b9f2b582ee75a7259c62ce162cebe368-300" class="audio" onclick="playSound(this,&quot;EN_US/b9/b9f2b582ee75a7259c62ce162cebe368-300&quot;,&quot;American English&quot;,&quot;EN_UK/b9/b9f2b582ee75a7259c62ce162cebe368-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10006304477" lid="EN:ensuring53277"><a id="dictEntry10006304477" href="/english-portuguese/translation/ensuring.html" class="dictLink">ensuring</a> <span class="tag_type" title="adjective&nbsp;/&nbsp;present&nbsp;participle">adj</span> <a id="EN_US/38/388053b7c0f6bc0351cb7698028e0611-300" class="audio" onclick="playSound(this,&quot;EN_US/38/388053b7c0f6bc0351cb7698028e0611-300&quot;,&quot;American English&quot;,&quot;EN_UK/38/388053b7c0f6bc0351cb7698028e0611-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10006143997" lid="EN:evident65031"><a id="dictEntry10006143997" href="/english-portuguese/translation/evident.html" class="dictLink">evident</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/a9/a98de8ad923cb627ea1cdccd5cf7356c-300" class="audio" onclick="playSound(this,&quot;EN_US/a9/a98de8ad923cb627ea1cdccd5cf7356c-300&quot;,&quot;American English&quot;,&quot;EN_UK/a9/a98de8ad923cb627ea1cdccd5cf7356c-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10007567171" lid="EN:dependable6284"><a id="dictEntry10007567171" href="/english-portuguese/translation/dependable.html" class="dictLink">dependable</a> <span class="tag_type" title="adjective">adj</span> <a id="EN_US/48/4811f2d3d13933a1b6baaed97f99ff31-300" class="audio" onclick="playSound(this,&quot;EN_US/48/4811f2d3d13933a1b6baaed97f99ff31-300&quot;,&quot;American English&quot;,&quot;EN_UK/48/4811f2d3d13933a1b6baaed97f99ff31-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n <span class="sep">·</span> </div>\n<div class="translation sortablemg"><div class="translation_desc"><span class="tag_trans" bid="10007651583" lid="EN:secured20815"><a id="dictEntry10007651583" href="/english-portuguese/translation/secured.html" class="dictLink">secured</a> <a id="EN_US/a7/a7c5ffcf139742f52a5267c4a0674129-300" class="audio" onclick="playSound(this,&quot;EN_US/a7/a7c5ffcf139742f52a5267c4a0674129-300&quot;,&quot;American English&quot;,&quot;EN_UK/a7/a7c5ffcf139742f52a5267c4a0674129-300&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></div><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n</div>\n</div></div>\n\n</div><!--translation_lines-->\n</div><!--meaninggroup-->\n</div><!--lemma_content--></div>',
//   },
//   {
//     word: '<div><h2 class="line lemma_desc" lid="PT:certo57693"><span class="tag_lemma"><a class="dictLink" rel="nofollow" href="/portuguese-english/translation/certo.html">certo</a> <a id="PT_BR/a8/a83e04630cf0fadfb641d66a91e5974a-400" class="audio" onclick="playSound(this,&quot;PT_BR/a8/a83e04630cf0fadfb641d66a91e5974a-400&quot;,&quot;Brazilian Portuguese&quot;,&quot;PT_PT/a8/a83e04630cf0fadfb641d66a91e5974a-400&quot;,&quot;European Portuguese&quot;);"></a> <span class="tag_wordtype">adverb</span></span><span class="dash">—</span></h2><div class="lemma_content"><div class="meaninggroup  sortablemg" gid="0"><div class="translation_lines"><div class="translation sortablemg"><h3 class="translation_desc"><span class="tag_trans" bid="10000979937" lid="EN:correctly29049"><a id="dictEntry10000979937" href="/english-portuguese/translation/correctly.html" class="dictLink">correctly</a> <span class="tag_type" title="adverb">adv</span> <a id="EN_US/45/452faada9535dd2c46b4a95ff0cbc35c-400" class="audio" onclick="playSound(this,&quot;EN_US/45/452faada9535dd2c46b4a95ff0cbc35c-400&quot;,&quot;American English&quot;,&quot;EN_UK/45/452faada9535dd2c46b4a95ff0cbc35c-400&quot;,&quot;British English&quot;);"></a><a class="expand_i"></a></span><!--tag_trans--></h3><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n</div>\n\n</div><!--translation_lines-->\n</div><!--meaninggroup-->\n</div><!--lemma_content--></div>',
//   },
//   {
//     word: '<div><h2 class="line lemma_desc" lid="PT:Certo#7537" href="/portuguese-english/translation/Certo..html"><span class="tag_lemma"><a class="dictLink" href="/portuguese-english/translation/Certo..html">Certo.</a></span><span class="dash">—</span></h2><div class="lemma_content"><div class="meaninggroup  sortablemg" gid="0"><div class="translation_lines"><div class="translation sortablemg"><h3 class="translation_desc"><span class="tag_trans" bid="10007466249" lid="EN:Of#course#24267"><a id="dictEntry10007466249" href="/english-portuguese/translation/Of+course..html" class="dictLink">Of course.</a><a class="expand_i"></a></span><!--tag_trans--></h3><!--translation_desc--><!-- editorial isFeatured 0 inType 0 allowFeatured 1 available: 0 -->\n</div>\n\n</div><!--translation_lines-->\n</div><!--meaninggroup-->\n</div><!--lemma_content--></div>',
//   },
// ];
const DictionaryCard = ({ html_data }) => {
  const datas = html_data.map((item) => parseHTML(item.word));

  return (
    <Card
      variant="outlined"
      //   sx={{ width: "50%", marginLeft: "20%" }}
      className="typo-examples"
    >
      {datas.map((item) => {
        let { title, gender, type, translations, translation_group } = item;
        return (
          <CardContent sx={{ marginBottom: -2 }}>
            <Box sx={{ marginBottom: 1 }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ display: "inline" }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: "inline" }}
                style={{ fontStyle: "italic" }}
              >
                {"  "}
                {gender !== null ? (
                  <Typography variant="body2" sx={{ display: "inline" }}>
                    {gender}
                    {"  "}
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ display: "inline" }}
                  ></Typography>
                )}
                {type}
              </Typography>
            </Box>
            {translations.map((trans, index) => (
              <div>
                <Typography
                  key={index}
                  variant="h6"
                  sx={{ display: "inline-flex", marginLeft: 1.5, padding: 0 }}
                >
                  {"  "}
                  {trans.word}{" "}
                  {trans.type ? (
                    <Typography
                      sx={{ marginTop: 0.7 }}
                      style={{ fontStyle: "italic" }}
                    >
                      - {trans.type}
                    </Typography>
                  ) : (
                    <Box sx={{ display: "inline" }}></Box>
                  )}
                </Typography>
                {"\n"}
                {trans.trs !== null ? (
                  trans.trs.map((oo) => {
                    return (
                      <Grid container>
                        <Grid xs={0.5}></Grid>
                        <Grid Typography xs={5.75}>
                          <Typography variant="caption">
                            {oo.split("—")[0]}
                          </Typography>
                        </Grid>
                        <Grid Typography xs={5.75}>
                          <Typography variant="caption">
                            {oo.split("—")[1]}
                          </Typography>{" "}
                        </Grid>
                      </Grid>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </div>
            ))}
            {translation_group ? (
              <Box sx={{ marginLeft: 2, marginTop: 1 }}>
                {translation_group.map((item, index) => (
                  <Typography
                    key={"tg_" + index}
                    variant="h6"
                    sx={{
                      display: "inline-flex",
                    }}
                  >
                    {item.word}{" "}
                    <Typography
                      key={"tg_" + index}
                      variant="caption"
                      sx={{
                        display: "inline-flex",
                      }}
                    >
                      {item.place_holder}
                    </Typography>{" "}
                    <Typography
                      key={"tg_" + index}
                      variant="caption"
                      sx={{
                        marginTop: 1,
                        marginRight: 1,
                        display: "inline-flex",
                      }}
                      style={{ fontStyle: "italic" }}
                    >
                      {item.type}{" "}
                    </Typography>
                    ·{" "}
                  </Typography>
                ))}
              </Box>
            ) : (
              <div display="inline"></div>
            )}
          </CardContent>
        );
      })}
    </Card>
  );
};

export default DictionaryCard;
