<template>
    <section>
        <footer>
            footer
        </footer>
    </section>
</template>



<script>
export default {
    name: "Footer",
    data(){
        return {
            footer: true
        }
    },
    methods:{
	}
}
</script>



<style type="text/css">
/*****************************************************************
    FOOTER
*****************************************************************/
footer svg {
    width: 1.35rem;
    fill: #ee5552;
    margin: 0 .3rem;
}

footer {
    background-color: #fff;
    width: 100vw;
}

footer p {
    display: flex;
    justify-content: flex-end;
    padding: 3em calc(2vw + 1em) .5em calc(2vw + 1em);
    font-size: .9em;
    text-transform: uppercase;
    white-space:nowrap;
    font-weight: 300;
}
footer p:nth-child(2) {
    padding: .5em calc(2vw + 1em) 3em calc(2vw + 1em);
}


footer p a, footer p strong {
    margin-left: .2em;
    font-weight: 500;
}
</style>
