
    // seletor: DATA [name=DT_ACOMPANHAMENTO]
    // HTML EXEMPLO:
    //  <td class=" " data-handler="selectDay" data-event="click" data-month="2" data-year="2024">
    //      <a class="ui-state-default" href="#">14</a>
    // </td>

    //seletor: PROFISSIONAL [name=ST_ACOMPANHADO]
    // Se o Beneficiário foi acompanhado
    // Valores: deve sempre ser S

    //seletor: PROFISSIONAL [name=CO_CNS]
    // Profissional responsável pelo atendimento:
    // EXCEL tabela "PROFISSIONAL"

    //seletor: É GESTANTE [name=ST_GESTANTE]
    // É gestante?
    // Valores: S ou N
    // HTML EXEMPLO:
    // <select name="ST_GESTANTE" class="form-control ng-valid ng-not-empty ng-dirty ng-valid-parse ng-touched" ng-model="formAcomp.ST_GESTANTE" ng-change="verificaGestante();liberaAcomp('E');" ng-disabled="progress || formAcomp.ST_BVG == 'S' || formAcomp.ST_GESTANTE == 'S' &amp;&amp; formAcomp.CO_SISTEMA_ORIGEM_ACOMP == 3 || formAcomp.ST_GESTANTE == 'S' &amp;&amp; formAcomp.CO_SISTEMA_ORIGEM_ACOMP == 4 || formAcomp.ST_GESTANTE == 'S' &amp;&amp; formAcomp.CO_SISTEMA_ORIGEM_ACOMP == 5" style="" data-gtm-form-interact-field-id="4">

    //seletor: PRÉ-NATAL [name=ST_PRE_NATAL]
    // HTML EXEMPLO:

    //seletor: MOTIVO PRÉ-NATAL [name=CO_BFA_MOTIVO_PRE_NATAL]
    // HTML EXEMPLO:
    // <select name="CO_BFA_MOTIVO_PRE_NATAL" class="form-control ng-valid ng-touched ng-dirty ng-valid-parse ng-empty" ng-disabled="progress || formAcomp.ST_SISTEMA == 'N' || formAcomp.ST_BVG == 'S'" ng-model="formAcomp.CO_BFA_MOTIVO_PRE_NATAL" style="" data-gtm-form-interact-field-id="6">
